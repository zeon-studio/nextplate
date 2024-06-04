import AdminSideBar from "@/partials/AdminSideBar";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

const AdminPanel = ({ user, pagetype }: Props) => {
  return (
    <>
      <section className="section flex flex-col">
        <AdminSideBar></AdminSideBar>
        <div className="container">
          <div className="row items-center justify-center">
            <div className="flex flex-col items-center p-6 text-5xl">
              Hello {user?.name}
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
};

export default AdminPanel;
