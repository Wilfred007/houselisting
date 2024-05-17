"use client";
import GoogleAddressSearch from "@/app/_component/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { supabase } from "../../../../utils/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";
//import { supabase } from '@utils/supabase/client'

const AddNewListing = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const { user } = useUser();
  //const user = "wilfredadzer@gmail.com"
  const [loader, setLoader] = useState(false);

  const nextHandler = async () => {
    setLoader(true);
    const { data, error } = await supabase
      .from("Listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();
    if (data) {
      setLoader(false);
      console.log("data is added,", data);
      toast("New Addy added");
    }
    if (error) {
      setLoader(false);
      console.log("Error");
      toast("Server Side Busted");
    }
  };
  return (
    <div className="p-10 flex flex-col gap-5 items-center justify-center">
      <h1 className="font-bold text-2xl">Add New Listing</h1>
      <div className="p-5 ronded-lg border shadow-md flex flex-col gap-5">
        <h1 className="text-gray-700">Enter address which you want to list</h1>
        <GoogleAddressSearch
          selectedAddress={(value) => setSelectedAddress(value)}
          setCoordinates={(value) => setCoordinates(value)}
        />

        <Button
          onClick={nextHandler}
          disabled={!selectedAddress || !coordinates || loader}
        >
          {loader ? <Loader className="animate-spin" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default AddNewListing;
