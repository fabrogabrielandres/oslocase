import { ArrowRight } from "lucide-react";
import { MaxWidthWrapper } from "../MaxWidthWrapper/MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import {
  LogoutLink,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            case<span className="text-blue-600">oslo</span>
          </Link>
          <LocaleSwitcher></LocaleSwitcher>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href={"/api/auth/logout"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign out
                </Link>
                <LogoutLink postLogoutRedirectURL="https://oslocase.vercel.app">
                  LogoutLink
                </LogoutLink>
                <LogoutLink postLogoutRedirectURL="/">
                  LogoutLink //
                </LogoutLink>

                {isAdmin ? (
                  <Link
                    href={`/dashboard`}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href={`/configure/upload`}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign up
                </Link>
                <RegisterLink>SUPLink</RegisterLink>
                {/* <a href="api/auth/login?post_login_redirect_url=/dashboardddd">
                  Sign in A
                </a>
                 */}

                <Link
                  href="/api/auth/login"
                  // href="api/auth/login?post_login_redirect_url=/dashboardddd"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>
                <LoginLink>Link</LoginLink>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  href={`/configure/upload`}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
