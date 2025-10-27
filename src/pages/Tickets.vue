<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-card border-b border-border sticky top-0 z-40">
      <div
        class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center"
      >
        <div>
          <h1 class="text-2xl font-bold text-card-foreground">Tickets</h1>
          <p class="text-muted-foreground text-sm sm:text-base">
            Manage all your support tickets
          </p>
        </div>

        <div class="hidden sm:flex gap-4">
          <RouterLink
            to="/tickets/create"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
          >
            Create Ticket
          </RouterLink>
          <RouterLink
            to="/dashboard"
            class="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
          >
            Dashboard
          </RouterLink>
          <button
            @click="handleLogout"
            class="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
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
              to="/tickets/create"
              class="block w-full px-4 py-2 text-left text-foreground hover:bg-muted transition"
            >
              Create Ticket
            </RouterLink>
            <RouterLink
              to="/dashboard"
              class="block w-full text-left px-4 py-2 hover:bg-muted transition"
            >
              Dashboard
            </RouterLink>
            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 hover:bg-muted transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Filters -->

      <div class="flex flex-wrap gap-2 mb-8" role="list">
        <button
          v-for="status in ['all', 'open', 'in_progress', 'closed']"
          :key="status"
          @click="filter = status as string"
          role="listitem"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition',
            filter === status
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ]"
        >
          {{
            status === "all"
              ? "All"
              : status === "in_progress"
                ? "In Progress"
                : status.charAt(0).toUpperCase() + status.slice(1)
          }}
        </button>
      </div>

      <!-- Tickets List -->
      <div v-if="filteredTickets.length === 0" class="text-center">
        <div
          class="bg-card border border-border rounded-lg p-8 sm:p-12 text-center"
        >
          <p class="text-muted-foreground text-lg mb-4">No tickets found</p>
          <RouterLink
            to="/tickets/create"
            class="text-white bg-primary rounded-md px-6 py-3 text-[14px]"
          >
            Create your first ticket
          </RouterLink>
        </div>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          class="bg-card rounded-lg border border-border p-6"
        >
          <div class="flex justify-between items-start gap-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-2">{{ ticket.title }}</h3>
              <p class="text-muted-foreground mb-4">{{ ticket.description }}</p>

              <div class="flex flex-wrap gap-4 text-sm">
                <span
                  :class="[
                    'px-3 py-1 rounded-full',
                    getStatusColor(ticket.status),
                  ]"
                >
                  {{
                    ticket.status === "in_progress"
                      ? "In Progress"
                      : ticket.status.charAt(0).toUpperCase() +
                        ticket.status.slice(1)
                  }}
                </span>
                <span
                  :class="[
                    'px-3 py-1 rounded-full',
                    getPriorityColor(ticket.priority),
                  ]"
                >
                  {{
                    ticket.priority.charAt(0).toUpperCase() +
                    ticket.priority.slice(1)
                  }}
                  Priority
                </span>
                <span class="text-muted-foreground">
                  {{ new Date(ticket.createdAt).toLocaleDateString() }}
                </span>
              </div>
            </div>

            <div class="flex gap-2">
              <RouterLink
                :to="`/tickets/${ticket.id}/edit`"
                class="px-3 py-1 text-sm border border-border rounded hover:bg-secondary transition"
              >
                Edit
              </RouterLink>
              <button
                @click="setDeleteConfirm(ticket.id)"
                class="px-3 py-1 text-sm border border-destructive text-destructive rounded hover:bg-destructive/10 transition"
              >
                Delete
              </button>
            </div>
          </div>

          <!-- Delete Confirmation -->
          <div
            v-if="deleteConfirm === ticket.id"
            class="mt-4 p-4 bg-destructive/10 rounded-lg"
            role="alert"
          >
            <p class="text-destructive font-medium mb-3">
              Are you sure you want to delete this ticket?
            </p>
            <div class="flex gap-2">
              <button
                @click="handleDelete(ticket.id)"
                :disabled="isLoading"
                class="px-4 py-1 rounded-md bg-destructive text-destructive-foreground text-[14px] hover:bg-destructive/90 transition disabled:opacity-50 flex items-center gap-2"
              >
                <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
                {{ isLoading ? "Deleting..." : "Delete" }}
              </button>
              <button
                @click="deleteConfirm = null"
                class="px-4 py-2 border rounded hover:bg-background bg-background order border-border transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-secondary/20 py-8 sm:py-12 mt-12">
      <div
        class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm"
      >
        <p>&copy; 2025 TicketFlow. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { Menu, X, Loader2 } from "lucide-vue-next";
import { logout } from "@/lib/auth";
import { getTickets, deleteTicket, type Ticket } from "@/lib/ticket-store";
import { toast } from "vue-sonner";

const router = useRouter();
const tickets = ref<Ticket[]>([]);
const filter = ref<"all" | "open" | "in_progress" | "closed">("all");
const deleteConfirm = ref<string | null>(null);
const isLoading = ref(false);
const isMenuOpen = ref(false);

const filteredTickets = computed(() =>
  tickets.value.filter(
    (t) => filter.value === "all" || t.status === filter.value
  )
);

const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-status-open/10 text-status-open";
    case "in_progress":
      return "bg-status-in-progress/10 text-status-in-progress";
    case "closed":
      return "bg-status-closed/10 text-status-closed";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-destructive";
    case "medium":
      return "text-status-in-progress";
    case "low":
      return "text-status-open";
    default:
      return "text-muted-foreground";
  }
};

const setDeleteConfirm = (id: string) => {
  deleteConfirm.value = id;
};

const handleDelete = async (id: string) => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (deleteTicket(id)) {
    tickets.value = tickets.value.filter((t) => t.id !== id);
    toast.success("Ticket deleted successfully");
    isLoading.value = false;
    deleteConfirm.value = null;
  }
};

const handleLogout = () => {
  logout();
  router.push("/");
};

onMounted(() => {
  tickets.value = getTickets();
});
</script>
