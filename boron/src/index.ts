import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

type Reminder = {
  "id": string,
  "title": string,
  "description": string,
  "dueDate": string,
  "isCompleted": boolean
}

const reminders : Reminder[] = [];

app.post("/reminders", async (context) => {
  try {
    const body = await context.req.json();

    const {id, title, description, dueDate, isCompleted} = body;

    const newReminder: Reminder = {
      id: body.id,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      isCompleted: body.isCompleted === true
    };

    if(!id || !title || !description || !dueDate || isCompleted === undefined) {
      return context.json({error: "Missing required fields"}, 400);
    }

    if (reminders.some(reminder => reminder.id === body.id)) {
      return context.json({ message: "400 Bad Request: Duplicate ID." }, 400);
    }

    reminders.push(newReminder)
    
    return context.json({ message: "Reminder added", reminder: newReminder }, 201);
  } 
  catch {
    return context.json({ message: "400 Bad Request, Invalid JSON format." }, 400);
  }
});


app.get("/reminders/completed", (context) => {
  const CompletedReminders = reminders.filter((reminder) => reminder.isCompleted === true);

  if (CompletedReminders.length === 0) {
    return context.json({ message: "404 Not Found: No completed reminders exist." }, 404);
  }

  return context.json({ reminders: CompletedReminders }, 200);
});

app.get("/reminders/not-completed", (context) => {
  const notCompletedReminders = reminders.filter((reminder) => reminder.isCompleted === false);

  if (notCompletedReminders.length === 0) {
    return context.json({ message: "404 Not Found: No uncompleted reminders exist." }, 404);
  }

  return context.json({ reminders: notCompletedReminders }, 200);
});

app.get("/reminders/due-today", (c) => {
  const todayDateString = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const dueTodayReminders = reminders.filter(
    (reminder) => reminder.dueDate >= todayDateString && reminder.isCompleted === false
  );
  if (dueTodayReminders.length === 0) {
    return c.json({ message: "No reminders due today" });
    }
  return c.json(dueTodayReminders,200);
});


app.get("/reminders/:id", (context) => {
  const id = context.req.param("id");
  const reminder = reminders.find((reminder) => reminder.id === id);
  
  if (reminder) {
    return context.json({ reminder });
  } 
  else {
    return context.json({ message: "404 Found" }, 404);
  }
});

app.get("/reminders", (context) => {
  try {
    if (reminders.length === 0) {
      return context.json({ message: "404 Not Found: No reminders exist." }, 404);
    }
    return context.json({ reminders }, 200);
  } catch {
    return context.json({ message: "500 Internal Server Error" }, 500);
  }
});



app.patch("/reminders/:id", async (context) => {
  try {
    const id = context.req.param("id");
    const body = await context.req.json();
    const reminder = reminders.find((r) => r.id === id);

    if (!reminder) {
      return context.json({ message: "404 Not Found: Reminder not found." }, 404);
    }

    const updatedReminder = { ...reminder, ...body };

    if (
      (body.title && typeof body.title !== "string") ||
      (body.description && typeof body.description !== "string") ||
      (body.dueDate && typeof body.dueDate !== "string") ||
      (body.isCompleted !== undefined && typeof body.isCompleted !== "boolean")
    ) {
      return context.json({ message: "400 Bad Request: Invalid fields provided." }, 400);
    }

    Object.assign(reminder, updatedReminder);

    return context.json({ message: "Reminder updated", reminder }, 200);
  } catch {
    return context.json({ message: "400 Bad Request: Invalid JSON format." }, 400);
  }
});


app.delete("/reminders/:id", (context) => {
  const id = context.req.param("id");
  const index = reminders.findIndex((reminder) => reminder.id === id);

  if (index === -1) {
    return context.json({ message: "404 Not Found: Reminder not found." }, 404);
  }

  reminders.splice(index, 1);

  return context.json({ message: "Reminder deleted successfully." }, 200);
});

app.post("/reminders/:id/mark-completed", (context) => {
  const id = context.req.param("id");
  const reminder = reminders.find((reminder) => reminder.id === id);

  if (!reminder) {
    return context.json({ message: "404 Not Found: Reminder not found." }, 404);
  }

  reminder.isCompleted = true;
  return context.json({ message: "Reminder marked as completed.", reminder }, 200);
});


app.post("/reminders/:id/unmark-completed", (context) => {
  const id = context.req.param("id");
  const reminder = reminders.find((reminder) => reminder.id === id);

  if (!reminder) {
    return context.json({ message: "404 Not Found: Reminder not found." }, 404);
  }

  reminder.isCompleted = false;
  return context.json({ message: "Reminder unmarked as completed.", reminder }, 200);
});


serve(app)