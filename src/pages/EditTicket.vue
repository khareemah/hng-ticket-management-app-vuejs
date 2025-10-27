<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-card border-b border-border sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-card-foreground">Edit Ticket</h1>

          <!-- Desktop Buttons -->
          <div class="hidden md:flex gap-3">
            <RouterLink
              to="/tickets"
              class="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
            >
              Back
            </RouterLink>
            <button
              @click="handleLogout"
              class="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
            >
              Logout
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden"
            @click="isMenuOpen = !isMenuOpen"
            aria-label="Toggle menu"
          >
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="md:hidden mt-4 space-y-2">
          <RouterLink
            to="/tickets"
            class="block px-4 py-2 border border-border rounded-lg hover:bg-secondary transition text-center"
          >
            Back
          </RouterLink>
          <button
            @click="handleLogout"
            class="w-full px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="ticket" class="bg-card rounded-lg border border-border p-8">
        <!-- 🟢 Using Vee Validate form -->
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          :initial-values="initialValues"
          v-slot="{ errors, isSubmitting }"
          class="space-y-6"
        >
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium mb-2"
              >Title <span class="text-destructive">*</span></label
            >
            <Field name="title" v-slot="{ field }">
              <input
                v-bind="field"
                type="text"
                class="w-full px-4 py-2 border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                :class="errors.title ? 'border-red-500' : 'border-border'"
                placeholder="Enter ticket title"
              />
            </Field>
            <p
              v-if="errors.title"
              class="text-red-600 font-semibold text-sm mt-1"
            >
              {{ errors.title }}
            </p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium mb-2">Description</label>
            <Field name="description" v-slot="{ field }">
              <textarea
                v-bind="field"
                placeholder="Enter ticket description"
                class="w-full px-4 py-2 border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring min-h-32 text-sm"
                :class="errors.description ? 'border-red-500' : 'border-border'"
              ></textarea>
            </Field>
            <p
              v-if="errors.description"
              class="text-red-600 font-semibold text-sm mt-1"
            >
              {{ errors.description }}
            </p>
          </div>

          <!-- Status & Priority -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Status -->
            <div>
              <label class="block text-sm font-medium mb-2"
                >Status <span class="text-destructive">*</span></label
              >
              <Field name="status" v-slot="{ field }">
                <select
                  v-bind="field"
                  class="w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <p
                  v-if="errors[0]"
                  class="text-red-600 font-semibold text-sm mt-1"
                >
                  {{ errors[0] }}
                </p>
              </Field>
            </div>

            <!-- Priority -->
            <div>
              <label class="block text-sm font-medium mb-2">Priority</label>
              <Field name="priority" v-slot="{ field }">
                <select
                  v-bind="field"
                  class="w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <p
                  v-if="errors[0]"
                  class="text-red-600 font-semibold text-sm mt-1"
                >
                  {{ errors[0] }}
                </p>
              </Field>
              <p v-if="errors.priority" class="text-destructive text-sm mt-1">
                {{ errors.priority }}
              </p>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition disabled:opacity-50 font-medium flex items-center justify-center gap-2"
            >
              <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
              {{ isSubmitting ? "Saving..." : "Save Changes" }}
            </button>
            <RouterLink
              to="/tickets"
              class="flex-1 py-2 border border-border rounded-lg hover:bg-secondary transition text-center font-medium"
            >
              Cancel
            </RouterLink>
          </div>
        </Form>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-muted-foreground">Ticket not found</p>
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="bg-secondary/50 border-t border-border py-8 px-4 sm:px-6 lg:px-8 mt-12"
    >
      <div class="max-w-7xl mx-auto text-center text-muted-foreground">
        &copy; 2025 TicketFlow. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { Form, Field } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { Menu, X, Loader2 } from "lucide-vue-next";
import { logout } from "@/lib/auth";
import { getTickets, updateTicket, type Ticket } from "@/lib/ticket-store";
import { toast } from "vue-sonner";

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);
const ticket = ref<Ticket | null>(null);

const schema = toTypedSchema(
  z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must not exceed 100 characters"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(1000, "Description too long")
      .optional()
      .nullable(),
    status: z.string().nonempty("Status is required"),
    priority: z.string().optional(),
  })
);

const initialValues = ref({
  title: "",
  description: undefined,
  status: "",
  priority: "",
});

const onSubmit = async (values: any) => {
  if (!ticket.value) return;

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateTicket(ticket.value.id, values);
    toast.success("Ticket updated successfully!");
    router.push("/tickets");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update ticket";
    toast.error(message);
  }
};

const handleLogout = () => {
  logout();
  router.push("/");
};

onMounted(() => {
  const ticketId = route.params.id as string;
  const tickets = getTickets();
  const foundTicket = tickets.find((t) => t.id === ticketId);

  if (foundTicket) {
    ticket.value = foundTicket;
    initialValues.value = {
      title: foundTicket.title,
      description: foundTicket.description || "",
      status: foundTicket.status,
      priority: foundTicket.priority || "",
    };
  }
});
</script>
