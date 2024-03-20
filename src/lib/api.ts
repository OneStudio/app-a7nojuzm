import { action, cache, redirect } from "@solidjs/router";
import { client } from "~/lib/db.ts";


    export const createComment = action(async (data: FormData) => {
      "use server";
      const columns: string[] = [];
      const values: any[] = [];
      for (const [key, value] of data.entries()) {
        columns.push(key);
        values.push(`'${value}'`);
      }
      const insertQuery = `INSERT INTO 'comment' (${columns.join(", ")}) VALUES (${values.join(", ")})`;
      const result = await client.execute(insertQuery);
      if (result?.rowsAffected) return redirect(`/comments/${result.lastInsertRowid}`);
    })
    



    export const deleteComment = action(async (id: string) => {
      "use server";
      const result = await client.execute({
        sql: "DELETE FROM 'comment' WHERE id = ?",
        args: [id],
      });
      if (result.rowsAffected) return redirect("/comments");
    })
    



    export const getComment = cache(async (id: string) => {
      "use server";
      const result = await client.execute({
        sql: "SELECT * FROM 'comment' WHERE id = ?",
        args: [id],
      });
      return result?.rows?.[0] ?? {};
    }, "comment")
    



    export const getComments = cache(async () => {
      "use server";
      const result = await client.execute("SELECT * FROM 'comment'");
      return result?.rows ? { columns: result.columns, rows: result.rows } : {}
    }, "comments")
    



    export const updateComment = action(async (id: string, data: FormData) => {
      "use server";
      const columns: string[] = [];
      const values: any[] = [];
      for (const [key, value] of data.entries()) {
        columns.push(key);
        values.push(`'${value}'`);
      }
      const updateQuery = `UPDATE 'comment' SET ${columns.map((col, i) => `${col} = ${values[i]}`).join(", ")} WHERE id = ${id}`;
      const result = await client.execute(updateQuery);
      if (result?.rowsAffected) return redirect(`/comments/${id}`);
    })
    