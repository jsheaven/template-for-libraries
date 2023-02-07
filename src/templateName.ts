export interface TemplateNameOptions {
  foo: string
}

export const templateName = async ({ foo }: TemplateNameOptions) => {
  console.log('Running templateName, --foo', foo)
}
