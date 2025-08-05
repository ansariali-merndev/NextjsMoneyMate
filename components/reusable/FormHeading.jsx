export const FormHeading = ({ isLogin }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Welcome Back to Money Mate
      </h2>

      <p className="text-center text-gray-500">
        {isLogin
          ? "Please sign in to your account to continue."
          : "Just a few steps away from smarter finances."}
      </p>
    </div>
  );
};
