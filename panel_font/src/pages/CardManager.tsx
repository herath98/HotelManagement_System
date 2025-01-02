import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/common/ui/button"
import { Input } from "@/components/common/ui/input"
import { Textarea } from "@/components/common/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/common/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card"
import { ExternalLink, Trash } from "lucide-react";
import { Label } from "@/components/common/ui/label"
import { useNavigate } from "react-router-dom";

interface WebsiteCard {
  title: string;
  description: string;
  url: string;
}

const STORAGE_KEY = 'website-cards';

const CardManager: React.FC = () => {
  // Initialize cards state with data from localStorage
  const [cards, setCards] = useState<WebsiteCard[]>(() => {
    const savedCards = localStorage.getItem(STORAGE_KEY);
    return savedCards ? JSON.parse(savedCards) : [];
  });

  const [form, setForm] = useState<WebsiteCard>({ title: "", description: "", url: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [urlError, setUrlError] = useState('');

  const navigate = useNavigate();

  // Save to localStorage whenever cards change
  useEffect(() => {
    if (cards.length >= 0) {  // Include empty array case
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
  }, [cards]);

  const validateUrl = (url: string) => {
    const urlPattern = /^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+/;
    return urlPattern.test(url);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (name === 'url') {
      setUrlError(validateUrl(value) ? '' : 'Please enter a valid URL starting with http:// or https://');
    }
  };

  const handleAddCard = () => {
    if (form.title.trim() && form.description.trim() && form.url.trim()) {
      if (!validateUrl(form.url)) {
        setUrlError('Please enter a valid URL starting with http:// or https://');
        return;
      }
      
      // Update cards with new card
      const newCards = [...cards, form];
      setCards(newCards);
      
      // Explicitly save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards));
      
      // Reset form and close modal
      setForm({ title: "", description: "", url: "" });
      setUrlError('');
      setIsModalOpen(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteCard = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
    // Explicitly save to localStorage after deletion
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCardClick = (card: WebsiteCard) => {
    navigate(`/admin/dashboard/website/${encodeURIComponent(card.title)}`, {
      state: { websiteData: card }
    });
  };

  const filteredCards = searchQuery
    ? cards.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.url.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cards;

  return (
    <div className="px-4 space-y-6">
      <div className="mb-5">
        <Card className="h-24 px-4 flex items-center">
          <div>
            <h2 className="text-2xl text-dark-gray">Account Home</h2>
            <p>harshaudayanga401@gmail.com</p>
          </div>
        </Card>
      </div>
      
      <Card className="mx-auto p-4 space-y-6">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <div className="flex justify-between items-center">
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-32 flex justify-center border">
                Add Website
              </Button>
            </DialogTrigger>
            <div className="w-96 items-center flex">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Website</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center text-dark-gray gap-2" htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  name="url"
                  value={form.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
                {urlError && <p className="text-sm text-yellow-500">{urlError}</p>}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center text-dark-gray gap-2" htmlFor="title">Website Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="My Website"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center text-dark-gray gap-2" htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  placeholder="Website Description"
                  rows={3}
                />
              </div>

              <Button onClick={handleAddCard} className={`w-full ${urlError ? 'opacity-20 bg-slate-400 cursor-not-allowed' : ''}`} disabled={urlError !== ''}>
                Save Website
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4 md:grid-cols-3">
          {filteredCards.map((card, index) => (
            <Card onClick={() => handleCardClick(card)} key={index} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-center space-x-2">
                  <div className="flex gap-3">
                    <a 
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <CardTitle className="flex justify-between">
                      <div>{card.title}</div>
                    </CardTitle>
                  </div>
                  <div className="flex justify-end items-center my-auto py-auto">
                    <Button 
                      variant="ghost" 
                      className="flex items-center"
                      onClick={(e) => handleDeleteCard(index, e)}
                    >
                      <Trash className="h-4 w-4"/>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="-mt-5">
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CardManager;