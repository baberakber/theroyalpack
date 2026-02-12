import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { GALLERY_CATEGORIES, type GalleryCategory } from './gallery-categories';
import type { GalleryItem } from './gallery-types';

export { GALLERY_CATEGORIES, type GalleryCategory };
export type { GalleryItem };

const DATA_FILE = path.join(process.cwd(), 'src/data/gallery.json');

interface GalleryData {
  items: GalleryItem[];
}

async function readData(): Promise<GalleryData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { items: [] };
  }
}

async function writeData(data: GalleryData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const data = await readData();
  return data.items.sort((a, b) => a.order - b.order);
}

export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  const items = await getGalleryItems();
  return items.find(item => item.id === id) || null;
}

export async function addGalleryItem(
  item: Omit<GalleryItem, 'id' | 'createdAt'>
): Promise<GalleryItem> {
  const data = await readData();
  const newItem: GalleryItem = {
    ...item,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  data.items.push(newItem);
  await writeData(data);
  return newItem;
}

export async function updateGalleryItem(
  id: string,
  updates: Partial<Omit<GalleryItem, 'id' | 'createdAt'>>
): Promise<GalleryItem | null> {
  const data = await readData();
  const index = data.items.findIndex(item => item.id === id);
  if (index === -1) return null;

  data.items[index] = { ...data.items[index], ...updates };
  await writeData(data);
  return data.items[index];
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const data = await readData();
  const initialLength = data.items.length;
  data.items = data.items.filter(item => item.id !== id);

  if (data.items.length === initialLength) return false;

  await writeData(data);
  return true;
}

export async function reorderGalleryItems(orderedIds: string[]): Promise<void> {
  const data = await readData();

  data.items = data.items.map(item => {
    const newOrder = orderedIds.indexOf(item.id);
    return { ...item, order: newOrder !== -1 ? newOrder + 1 : item.order };
  });

  await writeData(data);
}

