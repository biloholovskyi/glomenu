export default class RestoService {
  getMenuItems = async () => {
    const res = await fetch(`http://localhost:3000/menu`);

    if (!res.ok) {
      throw new Error(`error: ${res.status}`);
    }

    return await res.json();
  }
}