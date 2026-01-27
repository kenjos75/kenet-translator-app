"use client"

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useRef, useState } from "react";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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

export default function IdentifyForm() {

    
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [translated,setTranslated] = useState<string>('')
    

    const _handleIdentify = () => {
        setTranslated('Translating...')
        const btn = buttonRef.current 
        btn?.click()
    }

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

            const formData = new FormData();
            formData.append('file', data.file);

            const response = await fetch('/api/identify', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            const responseJson = await response.json();

            const {
                message
            } = responseJson
            if (message) {   
                setTranslated(message)
            }

        },
        onSuccess,
        onError,
    });
    return (
        <div className="flex flex-col">
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
                        className="cursor-pointer"
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
              <div className="flex justify-center space-x-2 w-full">
                <div className="w-full text-wrap text-md font-mono">
                    {
                        translated
                    }
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button ref={buttonRef} type="submit" disabled={mutation.isPending} className="min-w-[120px] hidden">
                  Trigger
                </Button>
              </div>
            </form>
          </Form>
          <button
              disabled={mutation.isPending}
              onClick={_handleIdentify}
              className="bg-blue-600 hover:bg-blue-700 text-white font-mono py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
            >
              {'Translate'}
          </button>
        </div>
    )
}