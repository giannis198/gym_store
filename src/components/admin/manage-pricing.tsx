"use client";
import React from "react";
import { PricingData, Tier } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { updatePricing } from "@/lib/actions/content";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const tierSchema = z.object({
  name: z.string().min(1, "Tier name is required"),
  price: z.string().regex(/^\d+$/, "Price must be a valid number").min(1, "Price is required"),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
  recommended: z.boolean(),
});

const formSchema = z.object({
  tiers: z.array(tierSchema),
});

type FormData = z.infer<typeof formSchema>;

export function ManagePricing({
  initialPricing,
}: {
  initialPricing: PricingData;
}) {
  const [pricing, setPricing] = React.useState<PricingData>(initialPricing);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tiers: initialPricing.tiers,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tiers",
  });

  React.useEffect(() => {
    if (editingIndex !== null) {
      form.reset({ tiers: [pricing.tiers[editingIndex]] });
    } else if (isAdding) {
      form.reset({ tiers: [{ name: '', price: '', features: [''], recommended: false }] });
    } else {
      form.reset({ tiers: pricing.tiers });
    }
  }, [editingIndex, isAdding, pricing.tiers, form]);


  const handleEdit = (index: number) => {
    setIsAdding(false);
    setEditingIndex(index);
  };

  const handleAddTier = () => {
    setEditingIndex(null);
    setIsAdding(true);
  };

  const handleDeleteTier = async (index: number) => {
    const newTiers = pricing.tiers.filter((_, i) => i !== index);
    const updatedPricingData = { ...pricing, tiers: newTiers };

    try {
      await updatePricing(updatedPricingData);
      setPricing(updatedPricingData);
      toast.success("Tier deleted successfully!");
    } catch (error: any) {
      toast.error(`Failed to delete tier: ${error.message}`);
    }
  };

  const onSubmit = async (data: FormData) => {
    let updatedPricingData: PricingData;

    if (editingIndex !== null) {
      const updatedTier = data.tiers[0];
      const newAllTiers = [...pricing.tiers];
      newAllTiers[editingIndex] = updatedTier;
      updatedPricingData = { ...pricing, tiers: newAllTiers };
    } else if (isAdding) {
      updatedPricingData = { ...pricing, tiers: [...pricing.tiers, data.tiers[0]] };
    } else {
      return;
    }

    try {
      await updatePricing(updatedPricingData);
      setPricing(updatedPricingData);
      setEditingIndex(null);
      setIsAdding(false);
      toast.success(isAdding ? "Tier added successfully!" : "Pricing updated successfully!");
    } catch (error: any) {
      toast.error(`Failed to update pricing: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black italic uppercase tracking-tight text-white">
          Manage Pricing
        </h2>
        <Button onClick={handleAddTier} className="bg-neon-volt text-matte-black hover:bg-neon-volt/90 font-black italic uppercase">
          <Plus className="w-4 h-4 mr-2" /> Add Tier
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pricing.tiers.map((tier, index) => {
          return (
            <Card
              key={index}
              className="bg-slate-grey/10 border-white/5 text-white flex flex-col justify-between relative"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/50 hover:text-white"
                  onClick={() => handleEdit(index)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500/50 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-matte-black border-white/10 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-white/50">
                        This action cannot be undone. This will permanently delete the {tier.name} tier.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteTier(index)} className="bg-red-500 text-white hover:bg-red-600">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl font-black italic uppercase text-neon-volt mb-2">
                  {tier.name}
                </CardTitle>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-black italic">$</span>
                  <span className="text-7xl font-black italic leading-none">
                    {tier.price}
                  </span>
                  <span className="text-white/30 font-bold uppercase text-xs mb-2">
                    /mo
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-white/60 text-sm"
                    >
                      <Check className="w-4 h-4 text-neon-volt shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-white/40 text-sm">
                  Recommended: {tier.recommended ? "Yes" : "No"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {(editingIndex !== null || isAdding) && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <Card className="bg-slate-grey/20 border-white/10 p-8 w-full max-w-2xl">
            <CardTitle className="text-3xl font-black italic uppercase text-neon-volt mb-6">
              {isAdding ? "Add New Tier" : `Edit ${pricing.tiers[editingIndex!]?.name} Tier`}
            </CardTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="tiers.0.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Tier Name</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-grey/30 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tiers.0.price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Price</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-grey/30 border-white/10 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel className="text-white/70">Features</FormLabel>
                  {fields[0]?.features?.map((feature, i) => (
                    <FormField
                      key={i}
                      control={form.control}
                      name={`tiers.0.features.${i}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 mb-2">
                            <FormControl>
                              <Input
                                className="bg-slate-grey/30 border-white/10 text-white"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              variant="ghost"
                              size="sm"
                              type="button"
                              onClick={() => {
                                const newFeatures = [...form.getValues('tiers.0.features')];
                                newFeatures.splice(i, 1);
                                form.setValue('tiers.0.features', newFeatures);
                              }}
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                        const currentFeatures = form.getValues('tiers.0.features') || [];
                        form.setValue('tiers.0.features', [...currentFeatures, '']);
                    }}
                    className="mt-2"
                  >
                    Add Feature
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="tiers.0.recommended"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white/70">Recommended</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4 mt-8">
                  <Button type="button" variant="ghost" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">{isAdding ? "Create Tier" : "Save Changes"}</Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
}
