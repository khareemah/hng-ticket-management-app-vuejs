<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="bg-card rounded-lg border border-border p-8">
        <h1 class="text-3xl font-bold mb-2">Create Account</h1>
        <p class="text-muted-foreground mb-6">
          Join TicketFlow and start managing tickets
        </p>

        <!-- Error Message -->
        <div
          v-if="errorMsg"
          class="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg"
        >
          {{ errorMsg }}
        </div>

        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium mb-2">Full Name</label>
            <Field name="name" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
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

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <Field name="email" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="email"
                placeholder="you@example.com"
                class="w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
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
            <label class="block text-sm font-medium mb-2">Password</label>
            <Field name="password" v-slot="{ field, errors }">
              <div class="relative">
                <input
                  v-bind="field"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full px-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring pr-10"
                  :class="errors[0] ? 'border-red-500' : 'border-border'"
                />
                <!-- Toggle Password -->
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Eye v-if="!showPassword" class="w-5 h-5" />
                  <EyeOff v-else class="w-5 h-5" />
                </button>
              </div>
              <p
                v-if="errors[0]"
                class="text-destructive text-sm mt-1 font-semibold"
              >
                {{ errors[0] }}
              </p>
            </Field>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition disabled:opacity-50 font-medium flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
            {{ isSubmitting ? "Creating account..." : "Create Account" }}
          </button>
        </form>

        <p class="text-center mt-6 text-muted-foreground">
          Already have an account?
          <RouterLink to="/auth/login" class="text-primary hover:underline">
            Sign in
          </RouterLink>
        </p>
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
import { signup } from "@/lib/auth";
import { toast } from "vue-sonner";

const router = useRouter();
const showPassword = ref(false);
const errorMsg = ref<string | null>(null);

const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .nonempty("Full name is required"),
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(signupSchema),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await signup(values.email, values.password, values.name);

    toast.success("Account created successfully!");
    router.push("/auth/login");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signup failed";
    errorMsg.value = message;
    toast.error(message);
  }
});
</script>
