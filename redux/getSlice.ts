export async function getBooks(queryParams: any) {
   try {
      const response = await fetch(
         `http://localhost:2000/api/books?${new URLSearchParams(queryParams)}`,
      );
      if (!response.ok) {
         throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      return data.books;
   } catch (error) {
      console.error(error);
      throw error;
   }
}
