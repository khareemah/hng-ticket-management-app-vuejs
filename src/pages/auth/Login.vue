<template>
  <div
    class="w-full min-h-screen bg-[#f1f1f1] flex items-center justify-center p-8"
  >
    <div
      class="max-w-md w-full border border-border bg-white rounded-[12px] p-6 flex flex-col gap-6"
    >
      <!-- Header -->
      <div class="w-full flex flex-col gap-0">
        <h1 class="text-3xl font-bold text-card-foreground">Welcome Back</h1>
        <p class="text-muted-foreground">Sign in to your TicketFlow account</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMsg"
        class="bg-destructive/10 border border-destructive/20 text-red-500 px-4 py-3 rounded-md text-sm"
      >
        {{ errorMsg }}
      </div>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="w-full flex flex-col gap-6">
        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold mb-2">Email</label>
          <Field name="email" type="email" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring transition text-sm"
              :class="errors[0] ? 'border-red-500' : 'border-border'"
            />
            <p
              v-if="errors[0]"
              class="text-destructive text-sm font-semibold mt-1"
            >
              {{ errors[0] }}
            </p>
          </Field>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-semibold mb-2">Password</label>
          <Field name="password" type="password" v-slot="{ field, errors }">
            <div class="relative">
              <input
                v-bind="field"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring transition text-sm pr-10"
                :class="errors[0] ? 'border-red-500' : 'border-border'"
              />
              <!-- Toggle Button -->
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                aria-label="Toggle password visibility"
              >
                <Eye v-if="!showPassword" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
            <p
              v-if="errors[0]"
              class="text-destructive text-sm font-semibold mt-1"
            >
              {{ errors[0] }}
            </p>
          </Field>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
          {{ isSubmitting ? "Signing in..." : "Sign In" }}
        </button>

        <!-- Signup Link -->
        <p class="text-center text-muted-foreground text-sm">
          Don’t have an account?
          <RouterLink
            to="/auth/signup"
            class="text-primary hover:underline font-medium"
          >
            Sign up
          </RouterLink>
        </p>
      </form>

      <!-- Demo Credentials -->
      <div class="mt-2 pt-6 border-t border-border">
        <p class="text-xs text-muted-foreground mb-3 font-medium">
          Demo Credentials:
        </p>
        <div class="space-y-2 text-xs text-muted-foreground">
          <p>
            Email:
            <code class="bg-secondary px-2 py-1 rounded">
              test@example.com
            </code>
          </p>
          <p>
            Password:
            <code class="bg-secondary px-2 py-1 rounded"> password123 </code>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, Field } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { ref } from "vue";
import { Eye, EyeOff, Loader2 } from "lucide-vue-next";
import { useRouter, RouterLink } from "vue-router";
import { login } from "@/lib/auth";
import { toast } from "vue-sonner";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// Router & state
const router = useRouter();
const errorMsg = ref<string | null>(null);
const showPassword = ref(false);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
    await login(values.email, values.password);

    router.push("/dashboard");
    toast.success("Login successful!");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    errorMsg.value = message;
    toast.error(message);
  }
});
</script>
