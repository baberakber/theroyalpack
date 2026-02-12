import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FAQ_CATEGORIES, type FaqCategory } from './faq-categories';

export { FAQ_CATEGORIES, type FaqCategory };

const DATA_FILE = path.join(process.cwd(), 'src/data/faq.json');

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  createdAt: string;
}

interface FaqData {
  items: FaqItem[];
}

async function readData(): Promise<FaqData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { items: [] };
  }
}

async function writeData(data: FaqData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const data = await readData();
  return data.items.sort((a, b) => a.order - b.order);
}

export async function getFaqItem(id: string): Promise<FaqItem | null> {
  const items = await getFaqItems();
  return items.find(item => item.id === id) || null;
}

export async function addFaqItem(
  item: Omit<FaqItem, 'id' | 'createdAt'>
): Promise<FaqItem> {
  const data = await readData();
  const newItem: FaqItem = {
    ...item,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  data.items.push(newItem);
  await writeData(data);
  return newItem;
}

export async function updateFaqItem(
  id: string,
  updates: Partial<Omit<FaqItem, 'id' | 'createdAt'>>
): Promise<FaqItem | null> {
  const data = await readData();
  const index = data.items.findIndex(item => item.id === id);
  if (index === -1) return null;

  data.items[index] = { ...data.items[index], ...updates };
  await writeData(data);
  return data.items[index];
}

export async function deleteFaqItem(id: string): Promise<boolean> {
  const data = await readData();
  const initialLength = data.items.length;
  data.items = data.items.filter(item => item.id !== id);

  if (data.items.length === initialLength) return false;

  await writeData(data);
  return true;
}

export async function reorderFaqItems(orderedIds: string[]): Promise<void> {
  const data = await readData();

  data.items = data.items.map(item => {
    const newOrder = orderedIds.indexOf(item.id);
    return { ...item, order: newOrder !== -1 ? newOrder + 1 : item.order };
  });

  await writeData(data);
}

