'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { client } from '@/sanity/lib/client';

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Product title must be at least 2 characters.",
  }),
  price: z.string(),
  quantity: z.string()
})


function AddProduct() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      quantity: '',
      price: ''
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await client.create({ // Don't call create function on client side instead use route handlers or server actions 
        _type: 'product',
        title: data.title,
        price: data.price,
        quantity: data.quantity
      })
    }
    catch (err) {
      console.log(err);
    }
    finally{
      // remove loading here
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Price</FormLabel>
                <FormControl>
                  <Input placeholder="price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="quantity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default AddProduct;