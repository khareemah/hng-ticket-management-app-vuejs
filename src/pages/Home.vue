<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <nav
      class="bg-background border-b border-border fixed w-full top-0 left-0 shadow-sm z-50"
    >
      <div
        class="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center"
      >
        <!-- Logo -->
        <div class="text-2xl font-bold text-primary">TicketFlow</div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-4">
          <RouterLink
            v-if="authUser"
            to="/dashboard"
            class="bg-primary rounded-md text-primary-foreground px-4 py-2 hover:bg-primary/90 transition font-medium"
          >
            Dashboard
          </RouterLink>
          <template v-else>
            <RouterLink
              to="/auth/login"
              class="bg-background border border-border text-foreground hover:bg-secondary px-4 py-2 rounded-md transition font-medium"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/auth/signup"
              class="bg-primary rounded-md text-primary-foreground px-4 py-2 hover:bg-primary/90 transition font-medium"
            >
              Get Started
            </RouterLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden relative">
          <button
            class="p-2 rounded-md border border-border hover:bg-secondary transition"
            @click="isMenuOpen = !isMenuOpen"
            aria-label="Toggle menu"
          >
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>

          <!-- Mobile Dropdown Menu -->
          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 w-40 bg-card border border-border rounded-md shadow-md py-2 z-50"
          >
            <RouterLink
              v-if="authUser"
              to="/dashboard"
              class="block w-full px-4 py-2 text-left text-foreground hover:bg-muted transition"
              @click="isMenuOpen = false"
            >
              Dashboard
            </RouterLink>
            <template v-else>
              <RouterLink
                to="/auth/login"
                class="block w-full px-4 py-2 text-left text-foreground hover:bg-muted transition"
                @click="isMenuOpen = false"
              >
                Login
              </RouterLink>
              <RouterLink
                to="/auth/signup"
                class="block w-full px-4 py-2 text-left text-foreground hover:bg-muted transition"
                @click="isMenuOpen = false"
              >
                Get Started
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-40 md:py-28 overflow-hidden bg-background">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left content -->
          <div>
            <h1
              class="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Manage Your Tickets Effortlessly
            </h1>
            <p class="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              TicketFlow is a modern ticket management system designed to
              streamline your workflow and boost productivity.
            </p>

            <div class="flex gap-4">
              <RouterLink
                v-if="authUser"
                to="/dashboard"
                class="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition font-medium shadow-sm"
              >
                Dashboard
              </RouterLink>
              <template v-else>
                <RouterLink
                  to="/auth/login"
                  class="border border-border text-foreground hover:bg-accent/10 px-4 py-2 rounded-md transition font-medium w-[120px] flex items-center justify-center"
                >
                  Login
                </RouterLink>
                <RouterLink
                  to="/auth/signup"
                  class="bg-primary rounded-md text-primary-foreground px-4 py-2 hover:bg-primary/90 transition font-medium shadow"
                >
                  Get Started
                </RouterLink>
              </template>
            </div>
          </div>

          <!-- Decorative blur elements -->
          <div class="relative h-96 block">
            <!-- Top right gradient blob -->
            <div
              class="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl"
              style="
                background: linear-gradient(
                  135deg,
                  #3b82f6aa,
                  #60a5fa66,
                  transparent
                );
              "
            ></div>

            <!-- Bottom left gradient blob -->
            <div
              class="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl"
              style="
                background: linear-gradient(
                  45deg,
                  #60a5fa55,
                  #3b82f633,
                  transparent
                );
              "
            ></div>

            <!-- Subtle middle circle -->
            <div
              class="absolute inset-0 m-auto w-40 h-40 rounded-full blur-2xl"
              style="background-color: #3b82f622"
            ></div>
          </div>
        </div>
      </div>

      <!-- Layered Blue Wave Background -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg
          class="w-full h-auto"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- First wave -->
          <path
            d="M0,160 Q360,120 720,160 T1440,160 L1440,200 L0,200 Z"
            fill="url(#blueWave1)"
          />
          <!-- Second wave -->
          <path
            d="M0,180 Q360,140 720,180 T1440,180 L1440,200 L0,200 Z"
            fill="url(#blueWave2)"
          />

          <defs>
            <linearGradient id="blueWave1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.25" />
              <stop offset="100%" stop-color="#60A5FA" stop-opacity="0.15" />
            </linearGradient>
            <linearGradient id="blueWave2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1" />
              <stop offset="100%" stop-color="#60A5FA" stop-opacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-secondary/30">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-center mb-12 text-foreground">
          Why Choose TicketFlow?
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-6 bg-card rounded-lg border border-border"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-semibold mb-2 text-card-foreground">
              {{ feature.title }}
            </h3>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold mb-6 text-foreground">
          Ready to Get Started?
        </h2>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of teams using TicketFlow to manage their tickets
          efficiently.
        </p>
        <RouterLink
          to="/auth/signup"
          class="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition font-medium"
        >
          Start Free Today
        </RouterLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-border bg-secondary/20 py-12">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="font-bold text-lg mb-4 text-foreground">TicketFlow</h3>
            <p class="text-muted-foreground">
              Modern ticket management for teams
            </p>
          </div>

          <div>
            <h4 class="font-semibold mb-4 text-foreground">Product</h4>
            <ul class="space-y-2 text-muted-foreground">
              <li>
                <RouterLink to="#" class="hover:text-foreground transition">
                  Features
                </RouterLink>
              </li>
              <li>
                <RouterLink to="#" class="hover:text-foreground transition">
                  Pricing
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4 text-foreground">Company</h4>
            <ul class="space-y-2 text-muted-foreground">
              <li>
                <RouterLink to="#" class="hover:text-foreground transition">
                  About
                </RouterLink>
              </li>
              <li>
                <RouterLink to="#" class="hover:text-foreground transition">
                  Contact
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4 text-foreground">Legal</h4>
            <ul class="space-y-2 text-muted-foreground">
              <li>
                <RouterLink to="#" class="hover:text-foreground transition">
                  Privacy
                </RouterLink>
              </li>
              <li>
                <RouterLink to="#" class="hover:text-foreground transition">
                  Terms
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="border-t border-border pt-8 text-center text-muted-foreground"
        >
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Menu, X } from "lucide-vue-next";
import { authUser } from "@/lib/auth";

const isMenuOpen = ref(false);

const features = [
  {
    title: "Easy to Use",
    description: "Intuitive interface designed for teams of all sizes",
    icon: "✓",
  },
  {
    title: "Real-time Updates",
    description: "Stay synchronized with instant ticket status changes",
    icon: "⚡",
  },
  {
    title: "Secure & Reliable",
    description: "Your data is protected with industry-standard security",
    icon: "🔒",
  },
];
</script>
