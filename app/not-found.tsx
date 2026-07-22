import Link from 'next/link';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-24 text-center px-4">
      <div>
        <span className="text-7xl sm:text-9xl font-black text-gradient-google block">404</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-4">Page Not Found</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
          The developer route you are looking for does not exist or has been relocated.
        </p>

        <div className="mt-8">
          <Link href="/">
            <MagneticButton variant="google">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
