"use client";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../../../../../utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const EditListing = () => {
  const params = usePathname();
  const{user}=useUser();
  //const router = useRouter()
  //const user= 'wilfred@gmail.com'

  useEffect(() => {
    console.log(params.split("/")[2]);
    //user&&verifyUser();
  }, []);

  
  {/*const verifyUser = async () => {
    const { data, user}= await supabase 
    .from ('listing')
    .select('*')
    .eq('createdBy',user.primaryEmailAddress.emailAddress)
    .eq('id', params.split('/')[2])

    if(data?.length>0)
      {
        router.replace('/')
      }
  } */}
  //This line of code updates data into the supabase database
  const onSubmitHandler = async (formValue) => {
    const { data, error } = await supabase
      .from("Listing")
      .update(formValue)
      .eq('id', params.split("/")[2])
      .select();

    if (data) {
      console.log(data);
      toast("Data updated and pusblished");
    } 
    
    
    if (error){
      console.log('error')
    }

    
  };

  return (
    <div className="px-10 md:px-36 md:text-lg my-10">
      <h2 className="font-bold text-2xl mt-5">
        Enter some more details about your listing
      </h2>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({ 
          values,
          handleChange,
           handleSubmit
           }) => (
          <Form onSubmit={handleSubmit}>
            <div className="p-5 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-700">Rent Or Sell?</h2>
                  <RadioGroup
                    defaultValue="Buy"
                    onValueChange={(v) => (values.type = v)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Buy" id="Buy" />
                      <Label htmlFor="Buy">Buy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-700">Property Type</h2>
                  <Select onValueChange={(e) => (values.propertyType = e)}
                  //name='propertyType'
                  > 
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Bedroom</h2>
                  <Input
                    type="number"
                    placeholder="Ex.2"
                    name="bedroom"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Bathroom</h2>
                  <Input
                    type="number"
                    placeholder="Ex.2"
                    name="bathroom"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Built In</h2>
                  <Input
                    type="number"
                    placeholder="Ex.1900 Sq. Ft"
                    name="builtIn"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Parking</h2>
                  <Input
                    type="number"
                    placeholder="Ex.2"
                    name="parking"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Lot Size (Sq.ft)</h2>
                  <Input type="number" placeholder="" name="lotSize" />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Area (Sq.ft)</h2>
                  <Input
                    type="number"
                    placeholder="Ex.1900 Sq. Ft"
                    name="area"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Selling Price ($)</h2>
                  <Input
                    type="number"
                    placeholder="Ex.2"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">HOA (per month) ($)</h2>
                  <Input
                    type="number"
                    placeholder=""
                    name="hoa"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols gap-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-gray-500">Description</h2>
                  <Textarea
                    placeholder=""
                    name="description"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex gap-7 justify-end mt-5">
                <Button variant='ghost'>Save</Button>
                <Button type='submit'>Save & Publish</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
