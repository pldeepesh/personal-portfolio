export async function formDataToObject(request: Request) {
  const formData = await request.formData();

  return Object.fromEntries(formData.entries());
}
