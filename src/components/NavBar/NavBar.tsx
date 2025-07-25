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
import { getTranslations } from "next-intl/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  const t = await getTranslations("Components.NavBar");
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
                <LogoutLink
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                  postLogoutRedirectURL="https://oslocase.vercel.app"
                >
                  {t.rich("Logout")}
                </LogoutLink>
                {isAdmin ? (
                  <Link
                    href={`/dashboard`}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    {`${t.rich("Dashboard")} ✨`}
                  </Link>
                ) : null}
                <Link
                  href={`/configure/upload`}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  {t.rich("Create")}
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  {t.rich("Signup")}
                </RegisterLink>

                <LoginLink
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  {t.rich("Login")}
                </LoginLink>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  href={`/configure/upload`}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                  >
                  {t.rich("Create")}
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
