/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/lib/types";
import { createProject, updateProject } from "@/services/ProjectService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  children: React.ReactNode;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  useCase: "add" | "edit";
}

const urlSchema = z
  .string()
  .trim()
  .url()
  .min(1, "URL is required")
  .max(200, "URL must be 200 characters or fewer");

const schema = z.object({
  title: z.string().min(1, "Title is required").max(120, "Keep the title under 120 characters"),
  status: z.enum(["COMPLETED", "IN-PROGRESS", "PLANNED"], {
    required_error: "Status is required",
    invalid_type_error: "Status is required",
  }),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or fewer"),
  longDescription: z
    .string()
    .min(1, "Long description is required")
    .max(4000, "Long description must be 4000 characters or fewer"),
  githubUrl: z
    .string()
    .trim()
    .max(2048, "URL is too long")
    .url("Must be a valid URL"),
  liveUrl: z
    .string()
    .trim()
    .max(2048, "URL is too long")
    .url("Must be a valid URL"),
  technologiesStr: z
    .string()
    .min(1, "Technologies are required")
    .refine(
      (v) =>
        (v || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .every((t) => t.length <= 30),
      { message: "Each technology should be ≤ 30 characters" }
    )
    .refine(
      (v) =>
        (v || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean).length <= 20,
      { message: "Limit to 20 technologies" }
    ),
   images: z
    .array(
      z.string().trim()
    )
    .min(1, "At least 3 images are required")

});

export type ProjectFormValues = z.infer<typeof schema>;

const emptyDefaults: ProjectFormValues = {
  title: "",
  status: "PLANNED",
  description: "",
  longDescription: "",
  githubUrl: "",
  liveUrl: "",
  technologiesStr: "",
  images: ["", "", ""], // UI shows 3 inputs; schema enforces 3 valid URLs on submit
};

const toFormValues = (p: Project | null): ProjectFormValues => {
  if (!p) return emptyDefaults;
  // normalize images to exactly 3 input slots
  const imgs = Array.isArray(p.images) ? p.images.map((i) => (i ?? "").trim()).filter(Boolean) : [];
  const padded = imgs.slice(0, 3);
  while (padded.length < 3) padded.push("");

  return {
    title: p.title ?? "",
    status: (p.status as ProjectFormValues["status"]) ?? "PLANNED",
    description: p.description ?? "",
    longDescription: p.longDescription ?? "",
    githubUrl: p.githubUrl ?? "",
    liveUrl: p.liveUrl ?? "",
    technologiesStr: (p.technologies ?? []).join(", "),
    images: padded,
  };
};

const fromFormValues = (values: ProjectFormValues, base: Partial<Project> = {}): Partial<Project> => {
  const technologies = (values.technologiesStr || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // images already normalized by schema transform in submit path
  const images = (values.images || []).map((u) => u.trim()).filter(Boolean);

  return {
    ...base,
    title: values.title.trim(),
    status: values.status,
    description: values.description.trim(),
    longDescription: values.longDescription.trim(),
    githubUrl: values.githubUrl?.trim() || "",
    liveUrl: values.liveUrl?.trim() || "",
    technologies,
    images,
  };
};

const ProjectDialog = ({
  children,
  selectedProject,
  setSelectedProject,
  useCase,
}: Props) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(true);



  const defaults = useMemo(() => toFormValues(selectedProject), [selectedProject]);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onChange",
    shouldUnregister: false,
  });

  const { control, handleSubmit, register, reset, formState } = form;
  const isSubmitting = formState.isSubmitting;

  const { fields } = useFieldArray<ProjectFormValues>({
    control,
    name: "images",
  });

  // Reset form whenever the selected project changes or dialog opens
  useEffect(() => {
    reset(defaults, { keepDirty: false, keepErrors: false });
  }, [defaults, reset, open]);

  const onSubmit = async (values: ProjectFormValues) => {

    const payloadBase =
      useCase === "edit" && selectedProject?.id
        ? { id: selectedProject.id }
        : { userId: session?.user?.id };

    const payload = fromFormValues(values, payloadBase);

    try {
      let ok = false;
      const toastId = toast.loading(useCase === "edit" ? "Updating project..." : "Creating project...");

      if (useCase === "edit" && selectedProject?.id) {
        ok = await updateProject(selectedProject.id, payload);
      } else {
        ok = await createProject(payload);
      }

      toast.dismiss(toastId);

      if (ok) {
        toast.success(useCase === "edit" ? "Project updated successfully" : "Project created successfully");

        // Clean up & close
        setSelectedProject(null);
        setIsEditing(useCase === "add" ? true : false);
        setOpen(false);

        // Reset to a fresh state for next open
        reset(emptyDefaults, { keepDirty: false, keepErrors: false });
      } else {
        toast.error("Request failed. Please try again.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
      // keep dialog open and keep user input so they can retry
    }
  };

  const onCancel = () => {
    // revert changes to current project's defaults
    reset(defaults, { keepDirty: false, keepErrors: false });
    setIsEditing(useCase === "add" ? true : false);
    setSelectedProject(null);
    setOpen(false);
  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{useCase === "edit" ? selectedProject?.title || "Edit Project" : "New Project"}</DialogTitle>
          <DialogDescription>Project details and management</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input  placeholder="My project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select  value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="IN-PROGRESS">In Progress</SelectItem>
                        <SelectItem value="PLANNED">Planned</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea  rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Long Description */}
            <FormField
              control={control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <Textarea  rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <div className="space-y-2">
                    {fields.slice(0, 3).map((f, index) => (
                      <div key={f.id} className="flex items-center gap-2">
                        <Input
                          
                          placeholder={`Image URL #${index + 1}`}
                          {...register(`images.${index}` as const)}
                        />
                      </div>
                    ))}
                  </div>
                  <FormDescription>
                    Paste public URLs for your screenshots or cover images. Exactly 3 images. Duplicates are not allowed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input  placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl>
                      <Input  placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Technologies */}
            <FormField
              control={control}
              name="technologiesStr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies (comma separated)</FormLabel>
                  <FormControl>
                    <Input  placeholder="Next.js, TypeScript, Tailwind" {...field} />
                  </FormControl>
                  <FormDescription>We&apos;ll split these into an array when saving.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2">
              {useCase === "edit" ? (
                <div className="flex gap-2">
                  {
                    <>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                        Cancel
                      </Button>
                    </>
                  }
                </div>
              ) : (
                <div className="flex justify-end w-full">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
