import type { Route } from "./+types/articles.$id.delete";
import { redirect } from "react-router";
import { prisma } from "~/lib/db.server";

export async function action({ params }: Route.ActionArgs) {
  await prisma.article.delete({
    where: { id: params.id },
  });

  return redirect("/");
}
