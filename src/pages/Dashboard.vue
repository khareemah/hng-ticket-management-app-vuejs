<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-md"
    >
      <div
        class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center"
      >
        <!-- Left Side: Title -->
        <div>
          <h1 class="text-2xl font-bold text-card-foreground">Dashboard</h1>
          <p class="text-muted-foreground text-sm sm:text-base">
            Welcome back, {{ authUser?.name }}
          </p>
        </div>

        <!-- Right Side: Buttons (Desktop) -->
        <div class="hidden sm:flex gap-4">
          <RouterLink to="/tickets" class="inline-block">
            <button
              class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              Manage Tickets
            </button>
          </RouterLink>
          <button
            @click="handleLogout"
            class="px-4 py-2 rounded-md border border-border bg-background hover:bg-background transition"
          >
            Logout
          </button>
        </div>

        <!-- Mobile Dropdown Menu -->
        <div class="sm:hidden relative">
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="p-2 rounded-md border border-border hover:bg-secondary transition"
            aria-label="Toggle menu"
          >
            <Menu class="h-5 w-5" />
          </button>

          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 w-40 bg-card border border-border rounded-md shadow-md py-2 z-50"
          >
            <RouterLink
              to="/tickets"
              class="block w-full px-4 py-2 text-left text-foreground hover:bg-muted transition"
              @click="isMenuOpen = false"
            >
              Manage Tickets
            </RouterLink>
            <button
              @click="
                () => {
                  handleLogout();
                  isMenuOpen = false;
                }
              "
              class="block w-full text-left px-4 py-2 hover:bg-muted transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main
      class="max-w-[1440px] mx-auto py-12 pt-28 lg:pt-36 px-4 sm:px-6 lg:px-8"
    >
      <!-- Stats Grid -->
      <div class="grid md:grid-cols-4 gap-6 mb-12">
        <div
          v-for="(stat, i) in stats"
          :key="i"
          class="bg-card border border-border rounded-lg p-6 shadow"
        >
          <p
            :class="[
              'text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2',
              stat.badgeClass,
            ]"
          >
            {{ stat.label }}
          </p>
          <p :class="['text-4xl font-bold', stat.valueClass]">
            {{ stat.value }}
          </p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-card border border-border rounded-lg p-6 shadow">
        <h2 class="text-xl font-semibold mb-4 text-card-foreground">
          Quick Actions
        </h2>
        <div class="flex flex-col sm:flex-row gap-4">
          <RouterLink
            to="/tickets/create"
            class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition text-center flex-1"
          >
            Create New Ticket
          </RouterLink>
          <RouterLink
            to="/tickets"
            class="px-6 py-3 border border-border rounded-md bg-background hover:bg-background transition text-center flex-1"
          >
            View All Tickets
          </RouterLink>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-secondary/20 py-12 mt-12">
      <div
        class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground"
      >
        <p>&copy; 2025 TicketFlow. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { Menu } from "lucide-vue-next";
import { authUser, logout } from "@/lib/auth";
import { getTicketStats } from "@/lib/ticket-store";

const router = useRouter();
const isMenuOpen = ref(false);
const stats = ref([
  {
    label: "Total Tickets",
    value: 0,
    badgeClass: "bg-primary/10 text-primary",
    valueClass: "text-primary",
  },
  {
    label: "Open",
    value: 0,
    badgeClass: "bg-status-open/10 text-status-open",
    valueClass: "text-status-open",
  },
  {
    label: "In Progress",
    value: 0,
    badgeClass: "bg-status-in-progress/10 text-status-in-progress",
    valueClass: "text-status-in-progress",
  },
  {
    label: "Closed",
    value: 0,
    badgeClass: "bg-status-closed/10 text-status-closed",
    valueClass: "text-status-closed",
  },
]);

const handleLogout = () => {
  logout();
  router.push("/");
};

onMounted(() => {
  const ticketStats = getTicketStats();
  stats.value = [
    {
      label: "Total Tickets",
      value: ticketStats.total,
      badgeClass: "bg-primary/10 text-primary",
      valueClass: "text-primary",
    },
    {
      label: "Open",
      value: ticketStats.open,
      badgeClass: "bg-status-open/10 text-status-open",
      valueClass: "text-status-open",
    },
    {
      label: "In Progress",
      value: ticketStats.inProgress,
      badgeClass: "bg-status-in-progress/10 text-status-in-progress",
      valueClass: "text-status-in-progress",
    },
    {
      label: "Closed",
      value: ticketStats.closed,
      badgeClass: "bg-status-closed/10 text-status-closed",
      valueClass: "text-status-closed",
    },
  ];
});
</script>
