'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen bg-light'>
      {/* Simple Header */}
      <header className='border-b border-blue-dark border-opacity-15 py-4 px-5 md:px-10'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <Link href='/'>
            <Image
              src='/eliteLogo.svg'
              alt='Elite Sports Management'
              className='w-[150px] h-[60px] md:w-[200px] md:h-[70px] cursor-pointer brightness-0'
              width={338}
              height={100}
            />
          </Link>
          <Link
            href='/'
            className='text-darkBlue hover:text-redd transition-colors font-roboto font-light text-sm md:text-base'
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className='py-20 px-5 md:px-10'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='mb-12'>
            <h1 className='text-darkBlue text-4xl md:text-5xl lg:text-6xl font-bold font-inter uppercase mb-4'>
              Privacy Policy
            </h1>
            <p className='text-darkBlue text-lg font-roboto font-light'>
              Elite Sports Management
            </p>
          </div>

          {/* Introduction */}
          <div className='mb-10'>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mb-4'>
              Your privacy is important to us. At Elite Sports Management, we
              respect your privacy and comply with applicable laws and
              regulations regarding the personal information we may collect
              about you, whether through our website, applications, or
              associated services.
            </p>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mb-4'>
              Personal information refers to any data that can be used to
              identify you as an individual, including your name, address,
              email, device details, payment information, and how you interact
              with our digital platforms.
            </p>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed'>
              If our site contains links to third-party services, please note
              that those services have their own privacy policies. We recommend
              reviewing their policies before providing any information. This
              Privacy Policy does not cover activities conducted outside of our
              own platforms.
            </p>
          </div>

          {/* Effective Date */}
          <div className='mb-10 p-4 rounded-lg border-2 border-blue-dark border-opacity-15'>
            <p className='text-darkBlue text-sm font-roboto font-medium'>
              <strong>This policy is effective as of:</strong> 11/14/2025
            </p>
            <p className='text-darkBlue text-sm font-roboto font-medium mt-2'>
              <strong>Last updated:</strong> 11/14/2025
            </p>
          </div>

          {/* Information We Collect */}
          <section className='mb-10'>
            <h2 className='text-darkBlue text-2xl md:text-3xl font-bold font-inter uppercase mb-6'>
              Information We Collect
            </h2>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mb-6'>
              We collect information in two main categories:
            </p>

            <div className='mb-6'>
              <h3 className='text-darkBlue text-xl md:text-2xl font-bold font-inter uppercase mb-4'>
                1. Information You Provide Voluntarily
              </h3>
              <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed'>
                At this time, our platform does not include contact forms,
                registration, subscription features, or any method for users to
                directly submit personal information.
              </p>
            </div>

            <div className='mb-6'>
              <h3 className='text-darkBlue text-xl md:text-2xl font-bold font-inter uppercase mb-4'>
                2. Information Collected Automatically
              </h3>
              <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mb-4'>
                When you access our platforms, certain information is
                automatically collected from your devices, including:
              </p>
              <ul className='list-disc list-inside text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed space-y-2 ml-4'>
                <li>IP address</li>
                <li>Device and browser type</li>
                <li>Approximate location</li>
                <li>Navigation activity within the site</li>
                <li>Data generated through Google Analytics</li>
              </ul>
              <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mt-4'>
                These tools help us understand how visitors use our site and
                improve their experience.
              </p>
            </div>
          </section>

          {/* Purpose of the Information */}
          <section className='mb-10'>
            <h2 className='text-darkBlue text-2xl md:text-3xl font-bold font-inter uppercase mb-6'>
              Purpose of the Information
            </h2>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mb-4'>
              We use the collected information to:
            </p>
            <ul className='list-disc list-inside text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed space-y-2 ml-4'>
              <li>Improve our services and optimize website performance</li>
              <li>Analyze on-site activity through Google Analytics</li>
              <li>
                Ensure the security and proper functioning of our platforms
              </li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className='mb-10'>
            <h2 className='text-darkBlue text-2xl md:text-3xl font-bold font-inter uppercase mb-6'>
              Data Protection
            </h2>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed'>
              We implement technical and organizational measures to safeguard
              your information against unauthorized access, loss, or disclosure.
              However, please be aware that no electronic transmission or
              storage system is completely secure.
            </p>
          </section>

          {/* User Rights */}
          <section className='mb-10'>
            <h2 className='text-darkBlue text-2xl md:text-3xl font-bold font-inter uppercase mb-6'>
              User Rights
            </h2>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mb-4'>
              You have the right to:
            </p>
            <ul className='list-disc list-inside text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed space-y-2 ml-4'>
              <li>
                Access, correct, or request the deletion of your personal
                information
              </li>
              <li>
                Withdraw consent for the use of your data where applicable
              </li>
              <li>Submit complaints to data protection authorities</li>
            </ul>
          </section>

          {/* Sports-Related Content */}
          <section className='mb-10'>
            <h2 className='text-darkBlue text-2xl md:text-3xl font-bold font-inter uppercase mb-6'>
              Sports-Related Content
            </h2>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed'>
              Our landing page displays content related to sports,
              organizations, and activities, but we do not collect or process
              medical data or sensitive information related to health or
              athletic performance.
            </p>
          </section>

          {/* Third-Party Integrations */}
          <section className='mb-10'>
            <h2 className='text-darkBlue text-2xl md:text-3xl font-bold font-inter uppercase mb-6'>
              Third-Party Integrations
            </h2>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mb-4'>
              Our site uses:
            </p>
            <ul className='list-disc list-inside text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed space-y-2 ml-4'>
              <li>Google Analytics for traffic analysis</li>
              <li>Hosting services for website operation</li>
            </ul>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mt-4'>
              These third parties may collect automatic browsing information
              according to their own privacy policies.
            </p>
          </section>

          {/* Contact */}
          <section className='mb-10 p-6 rounded-lg border-2 border-blue-dark border-opacity-15'>
            <h2 className='text-darkBlue text-2xl md:text-3xl font-bold font-inter uppercase mb-6'>
              Contact
            </h2>
            <p className='text-darkBlue text-base md:text-lg font-roboto font-light leading-relaxed mb-4'>
              If you have questions or wish to exercise your privacy rights, you
              can reach us at:
            </p>
            <div className='space-y-3 text-darkBlue text-base md:text-lg font-roboto font-light'>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href='mailto:dhany@elitesportsmgt.com'
                  className='text-darkBlue underline transition-colors'
                >
                  dhany@elitesportsmgt.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a
                  href='tel:+19548576541'
                  className='text-darkBlue underline transition-colors'
                >
                  +1 (954) 857-6541
                </a>
              </p>
              <p>
                <strong>Country of Operation:</strong> United States
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
