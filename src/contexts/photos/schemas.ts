import { z } from "zod";

export const photoNewFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Título é obrigatório" })
		.max(255, { message: "Título deve conter no máximo 255 caracteres" }),
	file: z
		.instanceof(FileList)
		.refine((file) => file.length > 0, { message: "Foto é obrigatória" }),
	albumsIds: z.array(z.string()).optional(),
});

export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>;
