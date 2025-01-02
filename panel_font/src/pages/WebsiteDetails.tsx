import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/common/ui/dialog';
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { ArrowLeft, Plus, Trash2, Pencil } from 'lucide-react';
import useFetch from '@/hooks/useFetch';
import Cookies from 'js-cookie';
import AdvancedLoading from '@/components/common/loading/AdvancedLoading';

interface WebPage {
  id?: string;
  pageName: string;
  path: string;
  lastUpdated: string;
  status: 'Active' | 'Under Maintenance';
  priority?: string;
  source: 'api' | 'local';
}

interface WebsiteData {
  title: string;
  description: string;
  url: string;
  pages?: WebPage[];
}

interface SitemapResponse {
  status: boolean;
  code: string;
  message: string;
  data: {
    exists: boolean;
    urls: string[];
    sitemapContent: string;
  };
}

const WebsiteDetails = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [websitePages, setWebsitePages] = useState<WebPage[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; pageId: string | null }>({
    isOpen: false,
    pageId: null
  });
  const sitemapDataRef = useRef<SitemapResponse | null>(null);

  const accessToken = Cookies.get('accessToken');
  
  const [editPage, setEditPage] = useState<WebPage>({
    pageName: '',
    path: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    status: 'Active',
    priority: '',
    source: 'local'
  });
  
  const [newPage, setNewPage] = useState<WebPage>({
    pageName: '',
    path: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    status: 'Active',
    priority: '',
    source: 'local'
  });

  const { data: urlData, loading: urlLoading, fetchData: urlFetch } = useFetch('/seo/analyze/sitemap/xml', {
    method: 'POST',
    accessToken,
    silent: true,
  });

  // Load local pages from localStorage
  useEffect(() => {
    const loadLocalPages = () => {
      const savedPages = localStorage.getItem(`website-pages-${title}`);
      if (savedPages) {
        return JSON.parse(savedPages);
      }
      return [];
    };

    const localPages = loadLocalPages();
    setWebsitePages(localPages);
  }, [title]);

  // Load website data
  useEffect(() => {
    const loadWebsiteData = () => {
      const stateData = location.state?.websiteData;
      if (stateData) {
        setWebsiteData(stateData);
        return stateData;
      }

      const savedCards = localStorage.getItem('website-cards');
      if (savedCards) {
        const cards: WebsiteData[] = JSON.parse(savedCards);
        const currentWebsite = cards.find(card => 
          card.title === decodeURIComponent(title || '')
        );
        setWebsiteData(currentWebsite || null);
        return currentWebsite;
      }
      return null;
    };

    loadWebsiteData();
  }, [title, location.state]);

  // Fetch sitemap data
  useEffect(() => {
    if (websiteData?.url) {
      urlFetch({
        data: {
          pageUrl: websiteData.url
        }
      });
    }
  }, [websiteData]);

  // Process sitemap data when received
  useEffect(() => {
    if (urlData) {
      sitemapDataRef.current = urlData as unknown as SitemapResponse;
      
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sitemapDataRef.current.data.sitemapContent, 'text/xml');
        const urlElements = xmlDoc.getElementsByTagName('url');
        
        const apiPages: WebPage[] = Array.from(urlElements).map((urlElement, index) => {
          const loc = urlElement.getElementsByTagName('loc')[0]?.textContent || '';
          const lastmod = urlElement.getElementsByTagName('lastmod')[0]?.textContent || '';
          const priority = urlElement.getElementsByTagName('priority')[0]?.textContent || '';
          
          const path = new URL(loc).pathname;
          const pageName = path === '/' ? 'Home' : path.split('/').filter(Boolean).pop() || '';
          
          return {
            id: `api-page-${index}-${Date.now()}`,
            pageName: pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' '),
            path: path,
            lastUpdated: lastmod.split('T')[0],
            status: 'Active',
            priority,
            source: 'api' as const
          };
        });
        
        // Combine API pages with existing local pages
        setWebsitePages(prev => {
          const localPages = prev.filter(page => page.source === 'local');
          return [...localPages, ...apiPages];
        });
      } catch (error) {
        console.error('Error parsing sitemap:', error);
      }
    }
  }, [urlData]);

  const handleAddNewClick = () => {
    setIsEditMode(false);
    setNewPage({
      pageName: '',
      path: '',
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'Active',
      priority: '',
      source: 'local'
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setEditPage(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setNewPage(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleEditPage = (page: WebPage) => {
    setEditPage(page);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdatePage = () => {
    if (editPage.pageName && editPage.path) {
      setWebsitePages(prev => {
        const updatedPages = prev.map(page => 
          page.id === editPage.id ? editPage : page
        );
        const localPages = updatedPages.filter(page => page.source === 'local');
        localStorage.setItem(`website-pages-${title}`, JSON.stringify(localPages));
        return updatedPages;
      });
      
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditPage({
        pageName: '',
        path: '',
        lastUpdated: new Date().toISOString().split('T')[0],
        status: 'Active',
        priority: '',
        source: 'local'
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleAddPage = () => {
    if (newPage.pageName && newPage.path) {
      const newPageWithId = {
        ...newPage,
        id: `local-page-${Date.now()}`,
        source: 'local' as const
      };
      
      setWebsitePages(prev => {
        const updatedPages = [...prev, newPageWithId];
        // Only store local pages in localStorage
        const localPages = updatedPages.filter(page => page.source === 'local');
        localStorage.setItem(`website-pages-${title}`, JSON.stringify(localPages));
        return updatedPages;
      });
      
      setNewPage({
        pageName: '',
        path: '',
        lastUpdated: new Date().toISOString().split('T')[0],
        status: 'Active',
        priority: '',
        source: 'local'
      });
      setIsModalOpen(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleDeleteConfirmation = (pageId: string) => {
    setDeleteConfirmation({ isOpen: true, pageId });
  };

  const handleDeletePage = () => {
    if (deleteConfirmation.pageId) {
      setWebsitePages(prev => {
        const updatedPages = prev.filter(page => page.id !== deleteConfirmation.pageId);
        const localPages = updatedPages.filter(page => page.source === 'local');
        localStorage.setItem(`website-pages-${title}`, JSON.stringify(localPages));
        return updatedPages;
      });
    }
    setDeleteConfirmation({ isOpen: false, pageId: null });
  };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setIsEditMode(false);
//     setEditPage({
//       pageName: '',
//       path: '',
//       lastUpdated: new Date().toISOString().split('T')[0],
//       status: 'Active',
//       priority: '',
//       source: 'local'
//     });
//   };

  if (!websiteData) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <p>Website not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log(isModalOpen)

  return (
    <div className="p-6 space-y-6">
      {urlLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
          <div className="flex justify-center items-center h-full min-h-[426px] py-auto">
            <AdvancedLoading size="md" />
          </div>
        </div>
      )}
      
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Websites
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{websiteData?.title} - Page Details</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{websiteData?.url}</p>
          </div>
          <Button className="flex items-center gap-2" onClick={handleAddNewClick}>
            <Plus className="h-4 w-4" />
            Add Page
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-16">Page Name</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {websitePages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium h-14">{page.pageName}</TableCell>
                    <TableCell>{page.path}</TableCell>
                    <TableCell>{page.lastUpdated}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        page.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.status}
                      </span>
                    </TableCell>
                    <TableCell>{page.priority}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        page.source === 'api' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {page.source === 'api' ? 'API' : 'Custom'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end ">
                      
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditPage(page)}
                              disabled={page.source==='api'? true : false}
                              className={`ml-2 pl-6`}
                            >
                              <Pencil className="h-4 w-4 text-blue-500 hover:text-blue-700" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteConfirmation(page.id!)}
                              className={``}
                              disabled={page.source==='api'? true : false}
                            >
                              <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                            </Button>
                          </>
                       
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
       {/* Separate Dialog for Add/Edit */}
       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Page' : 'Add New Page'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center text-dark-gray gap-2" htmlFor="pageName">Page Name</Label>
              <Input
                id="pageName"
                name="pageName"
                value={isEditMode ? editPage.pageName : newPage.pageName}
                onChange={handleInputChange}
                placeholder="e.g., About Us"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center text-dark-gray gap-2" htmlFor="path">Path</Label>
              <Input
                id="path"
                name="path"
                value={isEditMode ? editPage.path : newPage.path}
                onChange={handleInputChange}
                placeholder="e.g., /about"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center text-dark-gray gap-2" htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={isEditMode ? editPage.status : newPage.status}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="Active">Active</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center text-dark-gray gap-2" htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                name="priority"
                value={isEditMode ? editPage.priority : newPage.priority}
                onChange={handleInputChange}
                placeholder="e.g., 0.8"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={isEditMode ? handleUpdatePage : handleAddPage}>
                {isEditMode ? 'Update Page' : 'Add Page'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && setDeleteConfirmation({ isOpen: false, pageId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this page? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmation({ isOpen: false, pageId: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebsiteDetails;