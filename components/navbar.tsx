"use client";

import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const links = [
  { href: "/", label: "home" },
  { href: "/blog", label: "blog" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/display.jpeg" />
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
            <div className="flex gap-3">
              <Link
                href="https://github.com/mattbudde"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 hover:text-foreground/80 transition-colors" />
              </Link>
              <Link
                href="https://x.com/thisismbd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5 hover:text-foreground/80 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map(({ href, label }) => (
              <Link
                href={href}
                key={label}
                className="hover:text-foreground/80 hover:underline transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center relative z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-white hover:text-white/80 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`md:hidden absolute top-0 left-0 right-0 bg-background transform transition-transform duration-200 ease-in-out origin-top ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map(({ href, label }) => (
              <Link
                href={href}
                key={label}
                className="block px-3 py-2 hover:text-foreground/80 hover:underline transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
