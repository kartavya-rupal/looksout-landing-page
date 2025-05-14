'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      }
    }
  }, []);

  const handleSendNotification = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    }
    console.log(notificationPermission);

    if (Notification.permission === 'granted') {
      try {
        const notification = new Notification('Lookscout', {
          body: 'This is your notification!',
          tag: 'lookscout-notification',
          requireInteraction: true,
        });
        notification.onclick = () => {
          console.log('Notification clicked');
          window.focus();
          notification.close();
        };

        notification.onshow = () => {
          console.log('Notification shown');
        };

        notification.onerror = (err) => {
          console.error('Notification error:', err);
        };
      } catch (error) {
        console.error('Error creating notification:', error);
      }
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
        if (permission === 'granted') {
          handleSendNotification();
        }
      });
    } else {
      alert('Notifications are blocked. Please update your browser settings to allow notifications.');
    }
  };

  return (
    <div className="bg-[#2B63D9] text-white font-sans min-h-screen">
      <header className="flex items-center justify-between px-6 lg:px-25 py-6">
        <div className="flex items-center">
          <Image src="/companylogo.png" alt="Lookscout Logo" width={140} height={30} />
        </div>
        <button className="md:hidden">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <nav className="hidden md:flex space-x-8 text-white">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Our Products</a>
          <a href="#" className="hover:underline">Resources</a>
          <a href="#" className="hover:underline">Contacts</a>
        </nav>
        <div className="hidden md:flex space-x-4">
          <button className="text-white">Log in</button>
          <button className="bg-[#437EF7] text-white font-semibold px-4 py-2 rounded">Sign up</button>
        </div>
      </header>

      <span className="block h-[2px] bg-[#437EF7]"></span>

      <section className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-25 py-6 gap-8">
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
          <Image src="/photo.png" alt="Hero Graphic" width={450} height={500} />
        </div>
        <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Your Supercharged Design Workflow.
          </h1>
          <p className="text-base md:text-lg">
            We&apos;ve been told it is not possible to overachieve our customers&apos; expectations. We have not reinvented the wheel, we decided to build upon it.
          </p>
          <button
            className="bg-[#437EF7] text-white px-5 py-3 rounded font-semibold"
            onClick={handleSendNotification}
          >
            Send Notification
          </button>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-8">
            <Image src="/gitlab.png" alt="GitLab" width={90} height={24} />
            <Image src="/slack.png" alt="Slack" width={90} height={24} />
            <Image src="/netflix.png" alt="Netflix" width={90} height={24} />
            <Image src="/paypal.png" alt="PayPal" width={90} height={24} />
          </div>
        </div>
      </section>

      <section className="bg-white text-center text-[#1D4ED8] py-20 px-6 lg:px-25">
        <h2 className="text-3xl text-[#272D37] font-bold mb-4">Messaging for all</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-16">
          User generated content in real-time will have multiple touchpoints for offshoring.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: 'Easier Work Organization',
              desc: 'Efficiently unleash cross-media information without cross-media value. Quickly timely deliverables for real-time schemas.',
              icon: '/easyworkorg.png',
            },
            {
              title: 'Streamlined Processes',
              desc: 'Objectively innovate empowered scalable manufactured products whereas parallel platforms predominate extensible.',
              icon: '/streamproc.png',
            },
            {
              title: 'Marketing Analytics',
              desc: 'Phosfluorescently engage worldwide methodologies with web-enabled Interactively coordinate.',
              icon: '/marketanal.png',
            },
            {
              title: 'Fast Connection',
              desc: 'Completely pursue scalable customer cross- media through potentialities. Holistically quickly installed portals.',
              icon: '/fastconn.png',
            },
            {
              title: 'Easier Integrations',
              desc: 'Completely pursue scalable customer try through potentialities. Pontificate portals installed. Efficiently unleash information.',
              icon: '/easyint.png',
            },
            {
              title: 'Workflow Builder',
              desc: 'Collaboratively administrate turnkey service channels whereas virtual e-tailers. This is objectively scalable metrics whereas.',
              icon: '/workflow.png',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 p-6 rounded-md"
            >
              <Image src={feature.icon} alt={feature.title} width={40} height={40} />
              <h3 className="text-lg font-semibold text-black">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
              <a href="#" className="text-[#1D4ED8] font-medium inline-flex items-center">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#272D37]">
              Redefining Product Features
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Keeping your eye on the ball while performing a deep dive on the start-up mentality to&nbsp;
              derive convergence on cross-platform integration.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="space-y-10 w-full lg:w-1/2">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-600 text-white p-2 rounded-full">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#272D37]">
                    Explore ideas together
                  </h4>
                  <p className="text-gray-600">
                    Engage audience segments and finally create actionable insights. Amplify vertical integration.
                  </p>
                  <a href="#" className="text-blue-600 mt-2 inline-flex items-center font-medium hover:underline">
                    Learn more <span className="ml-1">→</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-600 text-white p-2 rounded-full">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 21h6v-2H9v2zm3-19C6.48 2 2 6.48 2 12c0 3.87 2.69 7.16 6.39 8.21L9 17h6l.61 3.21C19.31 19.16 22 15.87 22 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#272D37]">
                    Bring those ideas to life
                  </h4>
                  <p className="text-gray-600">
                    Engage audience segments and finally create actionable insights. Amplify vertical integration.
                  </p>
                  <a href="#" className="text-blue-600 mt-2 inline-flex items-center font-medium hover:underline">
                    Learn more <span className="ml-1">→</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-600 text-white p-2 rounded-full">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l-5.5 9h11zM2 22h20l-10-6z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#272D37]">
                    Ship better outcomes
                  </h4>
                  <p className="text-gray-600">
                    Engage audience segments and finally create actionable insights. Amplify vertical integration.
                  </p>
                  <a href="#" className="text-blue-600 mt-2 inline-flex items-center font-medium hover:underline">
                    Learn more <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <Image src="/foto4.png" width={500} height={500} alt="Office" className="mx-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#151B28] text-white py-16 px-6 md:px-16 flex flex-col-reverse md:flex-row items-center justify-around gap-12 md:gap-20">

        <div className="flex flex-col gap-10 max-w-xl">
          {[
            {
              icon: "✈️",
              title: "Explore ideas together",
              description: "Engage audience segments and finally create actionable insights. Amplify vertical integration.",
            },
            {
              icon: "💡",
              title: "Bring those ideas to life",
              description: "Engage audience segments and finally create actionable insights. Amplify vertical integration.",
            },
            {
              icon: "🚀",
              title: "Ship better outcomes",
              description: "Engage audience segments and finally create actionable insights. Amplify vertical integration.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white text-xl">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                <a href="#" className="text-sm text-blue-400 mt-1 inline-block hover:underline">
                  Learn more →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <img
            src="/halfcircle.png"
            alt="Decorative Half Circle"
            className="mx-auto"
          />
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-md mx-auto text-center  lg:max-w-3xl">
          <div className="bg-[#F8F9FB] p-6 rounded-lg shadow-sm text-left ">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo2.png" width={150} height={40} alt="Lookscout" />
            </div>

            <p className="mt-4 text-lg text-[#272D37]">
              Thank you for making it painless, pleasant and most of all hassle free! I love LookScout. I can&apos;t say enough about LookScout.
              <br />
              Great job, I will definitely be ordering again!
            </p>
            <div className="flex items-center mt-6">
              <img
                src="/Avatar.png"
                alt="Lisa Smith"
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">Lisa Smith</p>
                <p className="text-sm text-gray-500">CEO Company</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#272D37] mb-4">Latest Blog Posts</h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
            Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden text-left">
              <img src="/foto1.png" alt="Blog Post 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Organize your digital assets with a new methodology here.
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Podcasting operational management inside of workflows to establish a framework seamless. Convergence collaboratively.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Image src="/avatar1.png" alt="Author 1" width={40} height={40} className="rounded-full" />
                    <div>
                      <p className="text-gray-900 font-medium">Andrew Miller</p>
                      <p className="text-gray-500 text-xs">CEO</p>
                    </div>
                  </div>
                  <p>25 Apr</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden text-left">
              <img src="/foto2.png" alt="Blog Post 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Organize your digital assets with a new methodology here.
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Keeping your eye while performing a deep dive on the start-up mentality to derive convergence collaboratively.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Image src="/avatar2.png" alt="Author 1" width={40} height={40} className="rounded-full" />
                    <div>
                      <p className="text-gray-900 font-medium">David Munsan</p>
                      <p className="text-gray-500 text-xs">UX</p>
                    </div>
                  </div>
                  <p>25 Apr</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden text-left">
              <img src="/foto3.png" alt="Blog Post 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Organize your digital assets with a new methodology here.
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Image src="/avatar3.png" alt="Author 1" width={40} height={40} className="rounded-full" />
                    <div>
                      <p className="text-gray-900 font-medium">Andrew Meller</p>
                      <p className="text-gray-500 text-xs">UI</p>
                    </div>
                  </div>
                  <p>25 Apr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-t py-12 bg-white text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Proud to Be Used By</h2>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-10">
          Professionally cultivate one-to-one customer service with robust ideas.
          Dynamically innovate resource-leveling customer service for state of the art customer service.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 ">
          <Image src="/verge.png" alt="The Verge" width={100} height={30} />
          <Image src="/slack2.png" alt="Slack" width={100} height={30} />
          <Image src="/google.png" alt="Google" width={100} height={30} />
          <Image src="/paypal2.png" alt="PayPal" width={100} height={30} />
          <Image src="/pinterest.png" alt="Pinterest" width={100} height={30} />
          <Image src="/mailcimp.png" alt="Mailchimp" width={100} height={30} />
        </div>
      </section>

      <section className="w-full py-16 bg-white text-center px-4">
        <p className="text-xs font-semibold text-blue-600 uppercase mb-4">1% of the industry</p>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 max-w-2xl mx-auto mb-8">
          Welcome to your new digital reality that will rock your world truly at all throughout.
        </h1>

        <div className="flex justify-center items-center gap-2 max-w-md mx-auto mb-6">
          <input
            type="email"
            placeholder='Enter your email'
            className="px-4 py-2 w-full border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-[#437EF7] text-white px-5 py-2 text-sm rounded-r-md hover:bg-blue-700 transition" >
            Submit
          </button>
        </div>

        <div className="flex justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Image src="/tick.png" alt="Support" width={15} height={20} />
            Fully Secure
          </div>
          <div className="flex items-center gap-2">
            <Image src="/tick.png" alt="Support" width={15} height={20} />
            24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <Image src="/tick.png" alt="Support" width={15} height={20} />
            Done Deal
          </div>
        </div>
      </section>

      <footer className="bg-[#0B0D17] text-white px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-400 text-center md:text-left">

          <div className="flex flex-col items-center md:items-start">
            <Image src="/logo3.png" alt="Logo" width={150} height={30} className="mb-4" />
            <p>Generate outside the box thinking with the possibility to target the low.</p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>Community</li>
              <li>Events</li>
              <li>Help Center</li>
              <li>Partners</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Products</h4>
            <ul className="space-y-1">
              <li>Integrations</li>
              <li>Solutions</li>
              <li>Features</li>
              <li>Enterprise</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-medium mb-2">Get Email Notifications</h4>
            <p className="mb-4">Generate outside the box thinking with the possibility to target the low</p>
            <div className="flex w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter email..."
                className="px-3 py-2 rounded-l-md bg-[#1C1E2A] text-sm text-white border border-gray-600 placeholder-gray-400 w-full"
              />
              <button className="bg-[#437EF7] hover:bg-blue-700 px-4 py-2 text-sm text-white rounded-r-md">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 px-23 flex text-sm text-gray-500">
          <p>© 2023 Lookscout. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}
