import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "./lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback } from "react";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";

import {
  Button
} from '@/app/components/ui/button'

import {
  Input
} from "@/app/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function Home() {

  const imageFileSchema = z
  .instanceof(File)
  .refine((file: File) => file.size <= MAX_FILE_SIZE, {
    message: "Image must be smaller than 5MB",
  })
  .refine((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only JPG, PNG, and WEBP images are allowed",
  });

  const identifySchema = z.object({
    file: imageFileSchema
  })

  type Identify = z.infer<typeof identifySchema>
  

  const form = useForm<Identify>({
    resolver: zodResolver(identifySchema),
    defaultValues: {
        file: undefined
    },
  });


  const { toast } = useToast();

  const onSuccess = useCallback(() => {
    console.log('Identify succeeded')
    toast({
      title: "Translation generated",
      description: "Translation has been generated successfuly",
    });
  }, [ toast]);

  const onError = useCallback((error: Error) => {
    toast({
      title: "Error translating image.",
      description: error.message,
      variant: "destructive",
    });
  }, [ toast]);

  const mutation = useMutation({
    mutationFn: async (data: Identify) => {
        await apiRequest(`/api/v1/identify`, "POST", data);
    },
    onSuccess,
    onError,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-col">
        <div className="flex w-1/3 justify-center items-center mb-4">
          {'This app allow you to upload an image with japanese, chinese, or korean character and translate it to english.'}
        </div>
        <div className="flex">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                  <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        field.onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="submit" disabled={mutation.isPending} className="min-w-[120px]">
                {mutation.isPending ? (
                  <>
                    {"Identifying..."}
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer">
            {'Upload Here'}
          </button>
        </div>
    </div>
  );
}
