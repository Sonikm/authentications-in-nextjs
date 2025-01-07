/* eslint-disable @typescript-eslint/no-explicit-any */
const ProfileDataPage = ({ params }: any) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>{params.id}</h1>
    </div>
  );
};

export default ProfileDataPage;
