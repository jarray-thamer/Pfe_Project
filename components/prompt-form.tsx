"use client";

import * as z from "zod";
import { Prompt } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface PromptFormProps {
  initialData: Prompt | null;
}

const PREAMBLE = `I am an expert in React.js development. I can help you with component creation, state management, props, event handling, and best practices for building dynamic and interactive user interfaces. Feel free to ask me specific questions about React.js concepts, debugging issues, or code examples. `;

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  instructions: z
    .string()
    .min(2, { message: "Instructions require at least 200 characters" }),
  src: z.string().min(1, { message: "Image is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  isPublic: z.boolean().optional(),
});

const PromptForm = ({ initialData }: PromptFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      src: "",
      category: "",
      isPublic: false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Update

        await axios.patch(`/api/prompt/${initialData.id}`, values);
      } else {
        // Create new Prompt

        await axios.post("/api/prompt", values);
      }

      toast({ description: "Success", duration: 2000 });
      window.location.href = `/wall-e/${values.category}`;
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 2000,
      });
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-2 max-w-full mx-auto">
      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
          >
            <div className="space-y-2 w-full col-span-2">
              <div>
                <h3 className="text-lg font-medium">General Information</h3>
                <p className="text-sm text-muted-foreground">
                  General information about your Companion
                </p>
              </div>
              <Separator className="bg-primary/10" />
            </div>
            <FormField
              name="src"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="JavaScript"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is how your AI Companion will be named.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Programming language"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Short description for your AI Companion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 ">
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="  flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Companion privacy</FormLabel>
                      <FormDescription>
                        This section allows you to decide whether your companion
                        is publicly visible or remains private.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-1 md:grid-cols-2 ">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category to you prompt" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="code">Code Companion</SelectItem>
                          <SelectItem value="conversation">
                            Conversation Companion
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Category of your AI Companion
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <div>
                <h3 className="text-lg font-medium">Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed instructions for AI Behavior
                </p>
              </div>
              <Separator className="bg-primary/10" />
            </div>

            <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      rows={7}
                      className="bg-background resize-none"
                      placeholder={PREAMBLE}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe in detail your AI Companion relevant details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button size="lg" disabled={isLoading}>
                {initialData ? "Edit your companion" : "Create your companion"}
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PromptForm;
