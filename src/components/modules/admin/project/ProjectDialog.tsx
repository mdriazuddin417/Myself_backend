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
import { Edit } from "lucide-react";
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

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(120, "Keep the title under 120 characters"),
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
  images: ["", "", ""],
};

const toFormValues = (p: Project | null): ProjectFormValues => {
  if (!p) return emptyDefaults;
  return {
    title: p.title ?? "",
    status: (p.status as ProjectFormValues["status"]) ?? "PLANNED",
    description: p.description ?? "",
    longDescription: p.longDescription ?? "",
    githubUrl: p.githubUrl ?? "",
    liveUrl: p.liveUrl ?? "",
    technologiesStr: (p.technologies ?? []).join(", "),
    images: (() => {
      const arr = (p as any).images as string[] | undefined;
      const base = Array.isArray(arr) ? arr : [];
      const padded = [...base];
      while (padded.length < 3) padded.push("");
      return padded;
    })(),
  };
};

const fromFormValues = (
  values: ProjectFormValues,
  base: Partial<Project> = {}
): Partial<Project> => {
  const technologies = (values.technologiesStr || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return {
    ...base,
    title: values.title,
    status: values.status,
    description: values.description || "",
    longDescription: values.longDescription || "",
    githubUrl: values.githubUrl,
    liveUrl: values.liveUrl,
    technologies,
    images: (values.images || []).filter((u) => !!u && u.trim().length > 0),
  };
};

const ProjectDialog = ({
  children,
  selectedProject,
  setSelectedProject = () => {},
  useCase = "add",
}: Props) => {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(useCase === "add");

  const defaults = useMemo(
    () => toFormValues(selectedProject),
    [selectedProject]
  );

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  // Reset the form whenever the selected project changes or dialog opens
  useEffect(() => {
    form.reset(defaults);
  }, [defaults, form, open]);

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      if (useCase === "edit" && selectedProject?.id) {
        const startId = toast.loading("Updating project...");
        const payload = fromFormValues(values, { id: selectedProject.id });
        const ok = await updateProject(selectedProject.id, payload);
        toast.dismiss(startId);
        if (ok) {
          toast.success("Project updated successfully");
          setSelectedProject(null);
          setIsEditing(false);
          setOpen(false);
        }
      } else {
        const startId = toast.loading("Creating project...");
        const payload = fromFormValues(values, {
          userId: session.data?.user?.id,
        });
        console.log({payload});
        const ok = await createProject(payload);
        toast.dismiss(startId);
        if (ok) {
          toast.success("Project created successfully");
          setSelectedProject(null);
          setIsEditing(false);
          setOpen(false);
        }
      }
      form.reset(emptyDefaults);
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onCancel = () => {
    setOpen(false);
    setIsEditing(useCase === "add" ? true : false);
    setSelectedProject(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {useCase === "edit" ? selectedProject?.title : "New Project"}
          </DialogTitle>
          <DialogDescription>Project details and management</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        placeholder="My project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={!isEditing}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
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
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={!isEditing} rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Long Description */}
            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={!isEditing} rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images (dynamic list + validation) */}
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <div className="space-y-2">
                    {fields.map((f, index) => (
                      index < 3 && (
                        <div key={f.id} className="flex items-center gap-2">
                          <Input
                            disabled={!isEditing}
                            placeholder={`Image URL #${index + 1}`}
                            {...form.register(`images.${index}` as const)}
                          />
                        </div>
                      )
                    ))}
                  </div>
                  <FormDescription>
                    Paste public URLs for your screenshots or cover images. Up
                    to 3 images. Duplicates are not allowed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        placeholder="https://..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        placeholder="https://..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Technologies (comma separated string mapped to array on submit) */}
            <FormField
              control={form.control}
              name="technologiesStr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies (comma separated)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isEditing}
                      placeholder="Next.js, TypeScript, Tailwind"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll split these into an array when saving.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2">
              {useCase === "edit" ? (
                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button type="button" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button type="submit">Save Changes</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex justify-end w-full">
                  <Button type="submit">Submit</Button>
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
