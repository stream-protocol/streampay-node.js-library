import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = ({ initialBillboard }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={initialBillboard} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { billboardId } = context.params;

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId
    }
  });

  return {
    props: {
      initialBillboard: billboard
    }
  };
}

export default BillboardPage;
