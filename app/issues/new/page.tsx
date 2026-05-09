"use client";
import dynamic from "next/dynamic";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
      className="max-w-xl space-y-3"
    >
      <TextField.Root placeholder="Title..." {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="decription..." {...field} />
        )}
      />

      <Button>Create New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
