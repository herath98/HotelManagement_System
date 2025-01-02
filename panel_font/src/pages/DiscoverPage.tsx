import { Card, CardContent } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button'
import { ExternalLink, Zap, Maximize2, Lock, Shield } from 'lucide-react'
// import CardManager from './CardManager';


export default function DiscoverPage() {
  return (
    <div className="p-4 space-y-6 ">
    <div className='mb-5'>
        <Card className="h-24 px-4 flex items-center" >
            <div>  <h2 className="text-[22px]   items-center text-dark-gray">Discover</h2>
            <p>Explore the Cloudflare product range and see what’s new.
                 {/* <span className="bg-light-gray px-2 py-1 text-[12px] rounded ml-1"></span> */}
                 </p></div>
          
            </Card>
        
    </div>
    <Card className="bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="text-center max-w-7xl mx-auto">
        <div className="mb-8 relative">
          <div className="w-72 h-72 bg-blue-100/70 rounded-full mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="relative flex items-center justify-center gap-4 mt-16 mb-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="205" fill="none" viewBox="0 0 634 501"><circle cx="213.689" cy="213.689" r="213.689" fill="url(#a)" transform="matrix(-1 0 0 1 535.156 37.312)"></circle><circle cx="223.891" cy="223.891" r="222.355" stroke="url(#b)" stroke-width="3.072" transform="scale(-1 1) rotate(45 -79.443 -415.863)"></circle><circle cx="201.845" cy="201.845" r="194.403" fill="url(#c)" stroke="url(#d)" stroke-width="14.885" transform="scale(1 -1) rotate(35.142 974.623 157.765)"></circle><path fill="#F6821F" d="M376.875 189.032v145.645h188.718V189.032H376.875Zm1.25 144.397V203.42h186.218v130.009H378.125Z"></path><path fill="#fff" stroke="#0055DC" stroke-width="1.811" d="M378.403 190.561h185.658v142.586H378.403V190.561Z"></path><path fill="#0055DC" d="M376.875 189.032v145.645h188.718V189.032H376.875Zm1.25 144.397V203.42h186.218v130.009H378.125Z"></path><path fill="#fff" d="M383.598 198.566a2.303 2.303 0 0 0 2.309-2.297 2.302 2.302 0 0 0-2.309-2.297 2.303 2.303 0 0 0-2.309 2.297 2.304 2.304 0 0 0 2.309 2.297Zm7.475 0a2.304 2.304 0 0 0 2.309-2.297 2.303 2.303 0 0 0-2.309-2.297 2.303 2.303 0 0 0-2.309 2.297 2.304 2.304 0 0 0 2.309 2.297Zm7.461 0a2.304 2.304 0 0 0 2.309-2.297 2.303 2.303 0 0 0-2.309-2.297 2.302 2.302 0 0 0-2.309 2.297 2.303 2.303 0 0 0 2.309 2.297Z"></path><path fill="#E9F7FB" d="M552.465 215.448H390.006v105.74h162.459v-105.74Z"></path><path fill="#6ECCE5" d="M535.407 275.097H432.002v6.333h103.405v-6.333Zm-38.837 17.198h-65.506v6.333h65.506v-6.333Zm38.837-35.291H432.002v6.333h103.405v-6.333Zm0-18.096H432.002v6.334h103.405v-6.334Z"></path><ellipse cx="417.598" cy="277.284" fill="#52AEE3" rx="3.852" ry="3.844"></ellipse><ellipse cx="417.598" cy="295.237" fill="#6ECCE5" rx="3.852" ry="3.844"></ellipse><ellipse cx="417.598" cy="259.342" fill="#3790E0" rx="3.852" ry="3.844"></ellipse><ellipse cx="417.598" cy="241.402" fill="#0055DC" rx="3.852" ry="3.844"></ellipse><path fill="#F6821F" d="M77.342 189.032v145.645H266.06V189.032H77.342Zm1.25 144.397V203.42H264.81v130.009H78.592Z"></path><path fill="#fff" d="M265.433 189.655H77.965v144.397h187.468V189.655Z"></path><path fill="#0055DC" stroke="#0055DC" stroke-width="1.811" d="M77.342 189.032v145.645H266.06V189.032H77.342Zm1.25 144.397V203.42H264.81v130.009H78.592Z"></path><path fill="#fff" d="M84.069 198.566a2.304 2.304 0 0 0 2.31-2.297 2.303 2.303 0 0 0-2.31-2.297 2.303 2.303 0 0 0-2.31 2.297 2.303 2.303 0 0 0 2.31 2.297Zm7.465 0a2.303 2.303 0 0 0 2.309-2.297 2.303 2.303 0 0 0-2.31-2.297 2.303 2.303 0 0 0-2.308 2.297 2.304 2.304 0 0 0 2.309 2.297Zm7.47 0a2.304 2.304 0 0 0 2.31-2.297 2.303 2.303 0 0 0-2.31-2.297 2.303 2.303 0 0 0-2.309 2.297 2.304 2.304 0 0 0 2.31 2.297Z"></path><path fill="#AFE3F1" fill-opacity=".28" d="M252.932 216.356H90.472v105.74h162.46v-105.74Z"></path><path fill="#99DBED" d="M139.249 273.317v20.998h-17.183v-20.998h17.183Z"></path><path fill="#6ECCE5" d="M160.874 268.218v26.097h-17.183v-26.097h17.183Z"></path><path fill="#3790E0" d="M204.128 242.309v52.006h-17.183v-52.006h17.183Z"></path><path fill="#52AEE3" d="M182.499 264.645v29.67h-17.183v-29.67h17.183Z"></path><path fill="#6ECCE5" d="M107.778 293.992H218.42v2.151H107.778v-2.151Z"></path><path fill="url(#e)" d="M389.368 98.063H249.434c-5.38 0-9.741 4.352-9.741 9.72v274.846c0 5.369 4.361 9.721 9.741 9.721h139.934c5.379 0 9.74-4.352 9.74-9.721V107.783c0-5.368-4.361-9.72-9.74-9.72Z"></path><path fill="#0055DC" stroke="#0055DC" stroke-width="2" d="M389.371 393.572H249.437a10.99 10.99 0 0 1-7.745-3.21 10.941 10.941 0 0 1-3.215-7.729V107.781c.004-2.9 1.161-5.68 3.215-7.73a10.99 10.99 0 0 1 7.745-3.21h139.934a11 11 0 0 1 7.745 3.21 10.95 10.95 0 0 1 3.216 7.73v274.845a10.95 10.95 0 0 1-3.214 7.734 10.998 10.998 0 0 1-7.747 3.212ZM249.437 99.284a8.532 8.532 0 0 0-6.011 2.491 8.499 8.499 0 0 0-2.496 5.999v274.852a8.497 8.497 0 0 0 2.496 5.999 8.533 8.533 0 0 0 6.011 2.491h139.934a8.533 8.533 0 0 0 6.011-2.491 8.497 8.497 0 0 0 2.496-5.999V107.781a8.497 8.497 0 0 0-2.496-5.999 8.534 8.534 0 0 0-6.011-2.491l-139.934-.007Z"></path><path fill="#fff" d="M389.933 122.126h-141.06v246.162h141.06V122.126Z"></path><path fill="#fff" d="M319.405 295.531c27.849 0 50.425-22.531 50.425-50.324s-22.576-50.324-50.425-50.324c-27.849 0-50.425 22.531-50.425 50.324s22.576 50.324 50.425 50.324Z"></path><path fill="#F0F6FF" d="M319.401 288.819c24.136 0 43.703-19.527 43.703-43.615s-19.567-43.615-43.703-43.615c-24.136 0-43.702 19.527-43.702 43.615s19.566 43.615 43.702 43.615Z"></path><path fill="url(#f)" d="M355.062 231.763h-28.083l8.754-50.345-7.592-3.07-47.875 73.372 3.486 6.574h28.779l-7.863 50.856 7.631 2.913 46.249-73.766-3.486-6.534Zm-39.006 58.729 5.462-35.741-4.184-4.881h-25.797l32.498-49.833-6.12 35.269 4.184 4.999h25.448l-31.491 50.187Z"></path><defs><linearGradient id="a" x1="283.71" x2="213.689" y1="16.745" y2="427.378" gradientUnits="userSpaceOnUse"><stop offset=".021" stop-color="#C5EBF5"></stop><stop offset=".95" stop-color="#fff"></stop></linearGradient><linearGradient id="b" x1="297.255" x2="223.891" y1="17.545" y2="447.781" gradientUnits="userSpaceOnUse"><stop offset=".021" stop-color="#fff"></stop><stop offset=".477" stop-color="#E2F5FA"></stop><stop offset=".95" stop-color="#6ECCE5"></stop></linearGradient><linearGradient id="c" x1="150.297" x2="201.845" y1="-131.739" y2="403.691" gradientUnits="userSpaceOnUse"><stop stop-color="#E2F5FA"></stop><stop offset=".756" stop-color="#C5EBF5"></stop></linearGradient><linearGradient id="d" x1="201.845" x2="201.845" y1="0" y2="403.691" gradientUnits="userSpaceOnUse"><stop stop-color="#6ECCE5" stop-opacity=".3"></stop><stop offset="1" stop-color="#E2F5FA"></stop></linearGradient><linearGradient id="e" x1="319.401" x2="319.401" y1="161.872" y2="392.35" gradientUnits="userSpaceOnUse"><stop stop-color="#C5EBF5"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><linearGradient id="f" x1="319.407" x2="319.407" y1="107.457" y2="278.991" gradientUnits="userSpaceOnUse"><stop stop-color="#6ECCE5"></stop><stop offset="1" stop-color="#0055DC"></stop></linearGradient></defs></svg>
          </div>
        </div>
        <h1 className="text-xl md:text-xl text-gray-800 mb-8 max-w-7xl mx-auto">
          Add a website or application to Cloudflare to make it faster, more secure, and more reliable.
        </h1>
        <Button size="lg" className="bg-blue-400 hover:bg-blue-600">
          Get started
        </Button>
      </div>
    </Card>
    <div className="container mx-auto  py-8">
    <Card className="h-24 px-4 my-auto flex-row pt-4 items-center mb-2" >
      <h1 className="text-[22px]   items-center text-dark-gray">Product categories</h1>
      <p className="text-sm text-gray-600 mb-8">Get started with a category of products.</p>
      </Card>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              <Zap className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            <h2 className="text-[22px]   items-center text-dark-gray mb-3">Application Security & Performance</h2>
            <p className="text-gray-600 mb-6">Accelerate and protect a website or application</p>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full border-[#080909] border-[1px] md:w-auto">Add a website or application</Button>
              <div>
                <Button variant="link" className="text-blue-600">
                  View products
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              <Maximize2 className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            <h2 className="text-[22px]   items-center text-dark-gray mb-3">Developer Platform</h2>
            <p className="text-gray-600 mb-6">Deploy serverless code globally</p>
            <div className="space-y-3">
            <Button variant="ghost" className="w-full border-[#080909] border-[1px] md:w-auto">Start building</Button>
              <div>
                <Button variant="link" className="text-blue-600">
                  View products
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              <Lock className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            <h2 className="ttext-[22px]   items-center text-dark-gray mb-3">Zero Trust</h2>
            <p className="text-gray-600 mb-6">Secure a hybrid workforce</p>
            <div className="space-y-3">
            <Button variant="ghost" className="w-full border-[#080909] border-[1px] md:w-auto">Get started</Button>
              <div>
                <Button variant="link" className="text-blue-600">
                  View products
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              <Shield className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            <h2 className="text-[22px]   items-center text-dark-gray mb-3">Network Security</h2>
            <p className="text-gray-600 mb-6">Protect public or private networks</p>
            <div className="space-y-3">
            <Button variant="ghost" className="w-full border-[#080909] border-[1px] md:w-auto">
                Prepare for network onboarding
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
              <div>
                <Button variant="link" className="text-blue-600">
                  View products
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* <CardManager/> */}
      
    </div>
  )
}
