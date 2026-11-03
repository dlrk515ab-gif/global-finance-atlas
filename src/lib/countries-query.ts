import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fromRow, type CountryRow } from "@/data/countries";

export const countriesQuery = queryOptions({
  queryKey: ["countries"],
  queryFn: async () => {
    const { data, error } = await supabase.from("countries").select("code,name_ar,name_en,continent,bank,wallet").order("continent").order("name_ar");
    if (error) throw error;
    return (data as CountryRow[]).map(fromRow);
  },
});
