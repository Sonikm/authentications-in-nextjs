/* eslint-disable @typescript-eslint/no-explicit-any */
const ProfileDataPage = ({ params }: any) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p>User Token</p>
      <h1 className="bg-green-700 p-2">{params.id}</h1>
    </div>
  );
};

export default ProfileDataPage;
