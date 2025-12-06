import StoreLayout from "@/components/store/StoreLayout";


export const metadata = {
    title:'Gocart. - Store Dashboard',
    description:'GoCart. - Store Dashboard'
};

export default function RootAdminLayout ({children}){
    return(
        <>
        <StoreLayout>
            {children}
        </StoreLayout>
        </>
    )
}