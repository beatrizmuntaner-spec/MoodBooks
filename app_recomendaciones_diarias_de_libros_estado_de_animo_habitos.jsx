import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, BookOpen, Sparkles, Timer, Flame, Heart, Brain, Coffee, Moon, Sun, Wand2, Target, Clock4, CheckCircle2, BadgeCheck, Plus, RefreshCw, Lightbulb } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

// ------------------------------------------------------------
// Datos de ejemplo (puedes ampliarlos con ISBN, enlaces, etc.)
// ------------------------------------------------------------
const BOOKS = [
  {
    id: "b1",
    title: "La ridícula idea de no volver a verte",
    author: "Rosa Montero",
    genres: ["no-ficción", "memorias"],
    tags: ["conmovedor", "breve", "reflexivo"],
    moods: ["triste", "melancólica", "nostálgica"],
    length: "corto",
    difficulty: "media",
    pace: "medio",
    format: ["papel", "ebook", "audiolibro"],
    why: "Si estás sensible, es un abrazo inteligente con humor y duelo bien contado.",
  },
  {
    id: "b2",
    title: "El infinito en un junco",
    author: "Irene Vallejo",
    genres: ["ensayo", "historia"],
    tags: ["curioso", "bonito", "cultura"],
    moods: ["curiosa", "tranquila", "concentrada"],
    length: "largo",
    difficulty: "media",
    pace: "lento",
    format: ["papel", "ebook", "audiolibro"],
    why: "Para cuando quieres perderte en algo precioso y con mucha chispa intelectual.",
  },
  {
    id: "b3",
    title: "Convenience Store Woman",
    author: "Sayaka Murata",
    genres: ["ficción", "contemporánea"],
    tags: ["extraño", "agudo", "breve"],
    moods: ["cansada", "desmotivada", "curiosa"],
    length: "corto",
    difficulty: "fácil",
    pace: "rápido",
    format: ["papel", "ebook", "audiolibro"],
    why: "Lectura corta y rara (en el buen sentido) que te engancha sin pedirte energía.",
  },
  {
    id: "b4",
    title: "Hábitos atómicos",
    author: "James Clear",
    genres: ["no-ficción", "autoayuda"],
    tags: ["práctico", "microhábitos", "motivación"],
    moods: ["motivada", "perdida", "estresada"],
    length: "medio",
    difficulty: "fácil",
    pace: "medio",
    format: ["papel", "ebook", "audiolibro"],
    why: "Cuando quieres un empujón con estructura, sin filosofía de humo.",
  },
  {
    id: "b5",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genres: ["no-ficción", "historia"],
    tags: ["ideas", "curioso", "debate"],
    moods: ["curiosa", "concentrada"],
    length: "largo",
    difficulty: "media",
    pace: "medio",
    format: ["papel", "ebook", "audiolibro"],
    why: "Para días de cabeza despierta y ganas de ‘pensar cosas’.",
  },
  {
    id: "b6",
    title: "Persépolis",
    author: "Marjane Satrapi",
    genres: ["novela gráfica", "memorias"],
    tags: ["visual", "potente", "ágil"],
    moods: ["sin tiempo", "cansada", "curiosa", "desmotivada"],
    length: "corto",
    difficulty: "fácil",
    pace: "rápido",
    format: ["papel", "ebook"],
    why: "Si no te da la vida, lo visual hace el trabajo y aun así te deja pensando.",
  },
  {
    id: "b7",
    title: "El nombre del viento",
    author: "Patrick Rothfuss",
    genres: ["fantasía"],
    tags: ["inmersivo", "evadirse", "largo"],
    moods: ["ansiosa", "necesito evadirme", "tranquila"],
    length: "largo",
    difficulty: "media",
    pace: "medio",
    format: ["papel", "ebook", "audiolibro"],
    why: "Para días en los que necesitas salir de tu cabeza y vivir en otro sitio.",
  },
  {
    id: "b8",
    title: "El cuento de la criada",
    author: "Margaret Atwood",
    genres: ["distopía", "ficción"],
    tags: ["intenso", "crítico", "tensión"],
    moods: ["enfada", "concentrada", "curiosa"],
    length: "medio",
    difficulty: "media",
    pace: "medio",
    format: ["papel", "ebook", "audiolibro"],
    why: "Cuando te hierve la sangre y quieres canalizarlo en algo con colmillo.",
  },
  {
    id: "b9",
    title: "Poemas",
    author: "Idea: antología breve",
    genres: ["poesía"],
    tags: ["micro", "emocional", "rápido"],
    moods: ["sin tiempo", "nostálgica", "tranquila", "triste"],
    length: "corto",
    difficulty: "variable",
    pace: "rápido",
    format: ["papel", "ebook"],
    why: "Para días de 5 minutos. La poesía no pregunta, solo aparece.",
  },
  {
    id: "b10",
    title: "El alquimista",
    author: "Paulo Coelho",
    genres: ["ficción"],
    tags: ["ligero", "motivación", "fácil"],
    moods: ["desmotivada", "perdida", "necesito esperanza"],
    length: "corto",
    difficulty: "fácil",
    pace: "rápido",
    format: ["papel", "ebook", "audiolibro"],
    why: "Cuando no tienes gasolina mental y quieres algo sencillo que empuje un poco.",
  },
];

const MOODS = [
  { value: "tranquila", label: "Tranquila", icon: <Heart className="h-4 w-4" /> },
  { value: "curiosa", label: "Curiosa", icon: <Sparkles className="h-4 w-4" /> },
  { value: "concentrada", label: "Concentrada", icon: <Brain className="h-4 w-4" /> },
  { value: "estresada", label: "Estresada", icon: <Timer className="h-4 w-4" /> },
  { value: "cansada", label: "Cansada", icon: <Moon className="h-4 w-4" /> },
  { value: "desmotivada", label: "Desmotivada", icon: <RefreshCw className="h-4 w-4" /> },
  { value: "sin tiempo", label: "Sin tiempo", icon: <Clock4 className="h-4 w-4" /> },
  { value: "triste", label: "Triste", icon: <Heart className="h-4 w-4" /> },
  { value: "melancólica", label: "Melancólica", icon: <Heart className="h-4 w-4" /> },
  { value: "necesito evadirme", label: "Necesito evadirme", icon: <Wand2 className="h-4 w-4" /> },
  { value: "enfada", label: "Enfadada", icon: <Flame className="h-4 w-4" /> },
  { value: "necesito esperanza", label: "Necesito esperanza", icon: <Sun className="h-4 w-4" /> },
];

const DEFAULT_STATE = {
  profile: {
    name: "bea",
    preferredFormats: ["ebook"],
    preferredGenres: ["ficción", "no-ficción"],
    avoidGenres: [],
    readingSpeed: "medio", // lento | medio | rápido
    maxMinutesWeekday: 15,
    maxMinutesWeekend: 30,
    bedtimeReading: true,
    coffeeReading: false,
  },
  today: {
    mood: "tranquila",
    energy: 60, // 0-100
    timeAvailable: 15,
    wantShort: true,
    note: "",
  },
  habit: {
    goalMinutesPerDay: 15,
    streak: 0,
    log: [], // {dateISO, minutes}
  },
  library: {
    saved: [], // book ids
    finished: [],
    dismissed: [],
  },
};

function isoDate(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function loadState() {
  try {
    const raw = localStorage.getItem("moodbooks_state_v1");
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
      today: { ...DEFAULT_STATE.today, ...(parsed.today || {}) },
      habit: { ...DEFAULT_STATE.habit, ...(parsed.habit || {}) },
      library: { ...DEFAULT_STATE.library, ...(parsed.library || {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state) {
  localStorage.setItem("moodbooks_state_v1", JSON.stringify(state));
}

function scoreBook(book, ctx) {
  const { mood, energy, timeAvailable } = ctx.today;
  const { preferredFormats, preferredGenres, avoidGenres, readingSpeed } = ctx.profile;
  const { dismissed, finished } = ctx.library;

  if (dismissed.includes(book.id) || finished.includes(book.id)) return -999;

  let s = 0;

  // Mood match
  if (book.moods.includes(mood)) s += 40;

  // Genre preference
  const genreHit = book.genres.some((g) => preferredGenres.includes(g));
  if (genreHit) s += 15;

  // Avoided genres
  const avoidHit = book.genres.some((g) => avoidGenres.includes(g));
  if (avoidHit) s -= 25;

  // Format fit
  const fmtHit = book.format.some((f) => preferredFormats.includes(f));
  if (fmtHit) s += 10;

  // Time + length heuristics
  const wantsShort = timeAvailable <= 15 || ctx.today.wantShort;
  if (wantsShort && book.length === "corto") s += 18;
  if (!wantsShort && book.length === "largo") s += 6;
  if (wantsShort && book.length === "largo") s -= 10;

  // Energy vs difficulty
  if (energy < 35 && (book.difficulty === "fácil" || book.genres.includes("novela gráfica") || book.genres.includes("poesía"))) s += 14;
  if (energy < 35 && book.difficulty === "media") s -= 6;

  // Reading speed vs pace
  if (readingSpeed === "rápido" && book.pace === "rápido") s += 6;
  if (readingSpeed === "lento" && book.pace === "lento") s += 6;

  // Tiny nudge for novelty
  s += Math.random() * 3;

  return s;
}

function getDailyPicks(state, count = 3) {
  const scored = BOOKS.map((b) => ({ b, s: scoreBook(b, state) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, count)
    .map((x) => x.b);

  // Fallback if everything got filtered
  if (!scored.length) return BOOKS.slice(0, count);
  return scored;
}

function nextHabitSuggestions(state) {
  const { timeAvailable, mood, energy } = state.today;
  const { bedtimeReading, coffeeReading } = state.profile;
  const goal = state.habit.goalMinutesPerDay;

  const suggestions = [];

  // Time-based hacks
  if (timeAvailable <= 10) {
    suggestions.push({
      title: "Micro-lectura de 5 minutos",
      body: "Abre un texto corto (poesía, relato, capítulo mini) y lee solo 5 minutos. Si te quedas, te quedas. Si no, ya ganaste.",
      icon: <Timer className="h-4 w-4" />,
    });
  } else {
    suggestions.push({
      title: "Bloque mínimo viable",
      body: `Pon un temporizador de ${Math.min(15, timeAvailable)} min. No más. La regla es: empezar, no terminar.`,
      icon: <Target className="h-4 w-4" />,
    });
  }

  // Mood/energy
  if (mood === "estresada" || energy < 35) {
    suggestions.push({
      title: "Lectura de baja fricción",
      body: "Elige algo fácil: novela gráfica, capítulos cortos, audiolibro mientras haces cosas. Cero culpa.",
      icon: <Wand2 className="h-4 w-4" />,
    });
  }

  // Ritual cues
  if (bedtimeReading) {
    suggestions.push({
      title: "Ancla nocturna",
      body: "Deja el libro/ebook abierto en la mesilla. La fricción decide tu vida más que tu fuerza de voluntad.",
      icon: <Moon className="h-4 w-4" />,
    });
  }
  if (coffeeReading) {
    suggestions.push({
      title: "Ancla con café",
      body: "Café = 2 páginas. Siempre. Aunque sean malas. El ritual manda.",
      icon: <Coffee className="h-4 w-4" />,
    });
  }

  // Goal tuning
  if (goal > 20 && (mood === "sin tiempo" || timeAvailable < goal)) {
    suggestions.push({
      title: "Baja el listón (temporalmente)",
      body: "Si tu objetivo es demasiado alto, tu cerebro lo convierte en ‘fracaso’. Prueba 10 min durante una semana.",
      icon: <Lightbulb className="h-4 w-4" />,
    });
  }

  // Always one practical
  suggestions.push({
    title: "Plan B sin motivación",
    body: "Cambia el formato: audiolibro en trayectos, ebook en móvil con letra grande, o lectura en voz alta 3 min.",
    icon: <BookOpen className="h-4 w-4" />,
  });

  return suggestions.slice(0, 5);
}

function computeStreak(log) {
  // streak = días consecutivos (incluye hoy si hay registro hoy)
  const set = new Set(log.filter((x) => x.minutes > 0).map((x) => x.dateISO));
  let streak = 0;
  let d = new Date();
  for (;;) {
    const key = isoDate(d);
    if (!set.has(key)) break;
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function buildChartData(log) {
  // últimos 14 días
  const map = new Map(log.map((x) => [x.dateISO, x.minutes]));
  const out = [];
  const d = new Date();
  d.setDate(d.getDate() - 13);
  for (let i = 0; i < 14; i++) {
    const key = isoDate(d);
    out.push({ day: key.slice(5), minutes: map.get(key) || 0 });
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function Pill({ children }) {
  return <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">{children}</span>;
}

export default function MoodBooksApp() {
  const [state, setState] = useState(() => loadState());
  const todayISO = useMemo(() => isoDate(new Date()), []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  // Ensure a log entry exists for today
  useEffect(() => {
    setState((s) => {
      const exists = s.habit.log.some((x) => x.dateISO === todayISO);
      if (exists) return s;
      return {
        ...s,
        habit: {
          ...s.habit,
          log: [...s.habit.log, { dateISO: todayISO, minutes: 0 }],
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const picks = useMemo(() => getDailyPicks(state, 3), [state]);
  const habitTips = useMemo(() => nextHabitSuggestions(state), [state]);

  const streak = useMemo(() => computeStreak(state.habit.log), [state.habit.log]);
  const chartData = useMemo(() => buildChartData(state.habit.log), [state.habit.log]);

  const todayMinutes = useMemo(() => {
    const entry = state.habit.log.find((x) => x.dateISO === todayISO);
    return entry?.minutes || 0;
  }, [state.habit.log, todayISO]);

  const goal = state.habit.goalMinutesPerDay;
  const progress = clamp(Math.round((todayMinutes / Math.max(1, goal)) * 100), 0, 100);

  function update(path, value) {
    setState((s) => {
      const ns = structuredClone(s);
      let cur = ns;
      for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
      cur[path[path.length - 1]] = value;
      return ns;
    });
  }

  function toggleArray(path, item) {
    setState((s) => {
      const ns = structuredClone(s);
      let cur = ns;
      for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
      const key = path[path.length - 1];
      const arr = cur[key];
      cur[key] = arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
      return ns;
    });
  }

  function logMinutes(delta) {
    setState((s) => {
      const ns = structuredClone(s);
      const idx = ns.habit.log.findIndex((x) => x.dateISO === todayISO);
      if (idx === -1) ns.habit.log.push({ dateISO: todayISO, minutes: 0 });
      const i = ns.habit.log.findIndex((x) => x.dateISO === todayISO);
      ns.habit.log[i].minutes = clamp((ns.habit.log[i].minutes || 0) + delta, 0, 240);
      ns.habit.streak = computeStreak(ns.habit.log);
      return ns;
    });
  }

  function saveBook(id) {
    setState((s) => ({
      ...s,
      library: { ...s.library, saved: s.library.saved.includes(id) ? s.library.saved : [...s.library.saved, id] },
    }));
  }

  function dismissBook(id) {
    setState((s) => ({
      ...s,
      library: { ...s.library, dismissed: s.library.dismissed.includes(id) ? s.library.dismissed : [...s.library.dismissed, id] },
    }));
  }

  function finishBook(id) {
    setState((s) => ({
      ...s,
      library: {
        ...s.library,
        finished: s.library.finished.includes(id) ? s.library.finished : [...s.library.finished, id],
        saved: s.library.saved.filter((x) => x !== id),
      },
    }));
  }

  function resetDemo() {
    setState(DEFAULT_STATE);
    try {
      localStorage.removeItem("moodbooks_state_v1");
    } catch {}
  }

  const savedBooks = useMemo(() => BOOKS.filter((b) => state.library.saved.includes(b.id)), [state.library.saved]);
  const finishedBooks = useMemo(() => BOOKS.filter((b) => state.library.finished.includes(b.id)), [state.library.finished]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">MoodBooks</h1>
            <p className="text-sm text-muted-foreground">
              Recomendaciones diarias según tu estado de ánimo y tus hábitos, porque los humanos necesitan que les recuerden lo que les gusta.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <CalendarDays className="h-3.5 w-3.5" /> {todayISO}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Flame className="h-3.5 w-3.5" /> racha: {streak} día{streak === 1 ? "" : "s"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={resetDemo} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-12">
          <Card className="md:col-span-5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Hoy, ¿cómo estás?
              </CardTitle>
              <CardDescription>Esto no es terapia. Es solo un filtro para libros.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-2">
                <Label>Estado de ánimo</Label>
                <Select value={state.today.mood} onValueChange={(v) => update(["today", "mood"], v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOODS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        <span className="inline-flex items-center gap-2">
                          {m.icon} {m.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Energía</Label>
                  <Pill>{state.today.energy}/100</Pill>
                </div>
                <Slider
                  value={[state.today.energy]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(v) => update(["today", "energy"], v[0])}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Tiempo disponible hoy</Label>
                  <Pill>{state.today.timeAvailable} min</Pill>
                </div>
                <Slider
                  value={[state.today.timeAvailable]}
                  min={0}
                  max={90}
                  step={5}
                  onValueChange={(v) => update(["today", "timeAvailable"], v[0])}
                />
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Priorizar lecturas cortas</div>
                    <div className="text-xs text-muted-foreground">Útil si no hay cabeza ni tiempo.</div>
                  </div>
                  <Switch checked={state.today.wantShort} onCheckedChange={(v) => update(["today", "wantShort"], v)} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Nota (opcional)</Label>
                <Textarea
                  value={state.today.note}
                  onChange={(e) => update(["today", "note"], e.target.value)}
                  placeholder="Ej: 'No quiero nada triste' o 'solo algo visual'"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-7">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Recomendaciones de hoy
              </CardTitle>
              <CardDescription>Basado en tus inputs, no en poderes psíquicos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                {picks.map((b) => (
                  <Card key={b.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base leading-tight">{b.title}</CardTitle>
                      <CardDescription>{b.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {b.genres.slice(0, 2).map((g) => (
                          <Badge key={g} variant="secondary">
                            {g}
                          </Badge>
                        ))}
                        <Badge variant="outline">{b.length}</Badge>
                        <Badge variant="outline">{b.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{b.why}</p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" className="gap-2" onClick={() => saveBook(b.id)}>
                          <Plus className="h-4 w-4" /> Guardar
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => dismissBook(b.id)}>
                          <RefreshCw className="h-4 w-4" /> No hoy
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-2" onClick={() => finishBook(b.id)}>
                          <BadgeCheck className="h-4 w-4" /> Terminé
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Target className="h-4 w-4" /> Objetivo diario
                    </CardTitle>
                    <CardDescription>El objetivo tiene que servirte, no humillarte.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">{todayMinutes} / {goal} min</div>
                      <Pill>{progress}%</Pill>
                    </div>
                    <Progress value={progress} />
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="gap-2" onClick={() => logMinutes(5)}>
                        <CheckCircle2 className="h-4 w-4" /> +5 min
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2" onClick={() => logMinutes(10)}>
                        <CheckCircle2 className="h-4 w-4" /> +10 min
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-2" onClick={() => logMinutes(-5)}>
                        <RefreshCw className="h-4 w-4" /> -5 min
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      <Label>Meta (min/día)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={state.habit.goalMinutesPerDay}
                          min={1}
                          max={120}
                          onChange={(e) => update(["habit", "goalMinutesPerDay"], clamp(Number(e.target.value || 0), 1, 120))}
                        />
                        <span className="text-xs text-muted-foreground">Recomendación: 10–20</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Flame className="h-4 w-4" /> Tendencia (14 días)
                    </CardTitle>
                    <CardDescription>Una racha no es una religión. Solo un indicador.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <XAxis dataKey="day" tickMargin={8} />
                        <YAxis width={28} />
                        <Tooltip />
                        <Line type="monotone" dataKey="minutes" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="habitos" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="habitos">Hábito</TabsTrigger>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="biblioteca">Biblioteca</TabsTrigger>
          </TabsList>

          <TabsContent value="habitos" className="mt-4">
            <div className="grid gap-4 md:grid-cols-12">
              <Card className="md:col-span-7">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" /> Cómo ampliar tu hábito (sin motivación ni tiempo)
                  </CardTitle>
                  <CardDescription>Trucos prácticos para cuando tu cerebro decide que leer es opcional.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {habitTips.map((t) => (
                    <div key={t.title} className="flex gap-3 rounded-xl border p-3">
                      <div className="mt-0.5">{t.icon}</div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{t.title}</div>
                        <div className="text-sm text-muted-foreground">{t.body}</div>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="grid gap-2">
                    <div className="text-sm font-medium">Reglas rápidas (funcionan porque son aburridas)</div>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      <li><span className="text-foreground">Reduce fricción:</span> libro visible, app abierta, marcador puesto.</li>
                      <li><span className="text-foreground">Hazlo ridículamente pequeño:</span> 2 páginas, 3 minutos, 1 poema.</li>
                      <li><span className="text-foreground">Apila hábitos:</span> después de lavarte los dientes = 5 min de lectura.</li>
                      <li><span className="text-foreground">Cambia formato:</span> audiolibro en tareas, novela gráfica si estás agotada.</li>
                      <li><span className="text-foreground">Permiso explícito:</span> abandonar un libro es una habilidad, no un pecado.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock4 className="h-5 w-5" /> Plan de emergencia: cero tiempo
                  </CardTitle>
                  <CardDescription>Lectura compatible con vida real (lo sé, sorprendente).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border p-3">
                    <div className="text-sm font-medium">El menú de 10 minutos</div>
                    <div className="mt-1 text-sm text-muted-foreground">Elige uno. No combinarlos. No eres un robot.</div>
                    <div className="mt-3 grid gap-2">
                      {[
                        { k: "1", t: "5 min", d: "1 poema o 2 páginas" },
                        { k: "2", t: "7 min", d: "capítulo corto / relato" },
                        { k: "3", t: "10 min", d: "audiolibro mientras ordenas" },
                      ].map((x) => (
                        <div key={x.k} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                          <div className="text-sm font-medium">{x.t}</div>
                          <div className="text-sm text-muted-foreground">{x.d}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border p-3">
                    <div className="text-sm font-medium">Si no estás motivada</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Motivar es caro. Empieza por lo físico: abre el libro y lee una sola frase. Si suena ridículo, perfecto.
                    </div>
                  </div>

                  <div className="rounded-xl border p-3">
                    <div className="text-sm font-medium">Hack social (opcional)</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Cuéntale a alguien “hoy leo 5 min”. A los humanos les encanta cumplir promesas pequeñas.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="perfil" className="mt-4">
            <div className="grid gap-4 md:grid-cols-12">
              <Card className="md:col-span-7">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" /> Preferencias de lectura
                  </CardTitle>
                  <CardDescription>Esto afina las recomendaciones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-2">
                    <Label>Tu nombre (opcional)</Label>
                    <Input value={state.profile.name} onChange={(e) => update(["profile", "name"], e.target.value)} />
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-medium">Formatos</div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { k: "papel", t: "Papel" },
                        { k: "ebook", t: "eBook" },
                        { k: "audiolibro", t: "Audiolibro" },
                      ].map((x) => (
                        <Button
                          key={x.k}
                          type="button"
                          variant={state.profile.preferredFormats.includes(x.k) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleArray(["profile", "preferredFormats"], x.k)}
                        >
                          {x.t}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-medium">Géneros que te apetecen</div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "ficción",
                        "no-ficción",
                        "fantasía",
                        "poesía",
                        "ensayo",
                        "novela gráfica",
                        "distopía",
                        "memorias",
                        "historia",
                        "autoayuda",
                        "contemporánea",
                      ].map((g) => (
                        <Button
                          key={g}
                          type="button"
                          variant={state.profile.preferredGenres.includes(g) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleArray(["profile", "preferredGenres"], g)}
                        >
                          {g}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="text-sm font-medium">Géneros que prefieres evitar</div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "ficción",
                        "no-ficción",
                        "fantasía",
                        "poesía",
                        "ensayo",
                        "novela gráfica",
                        "distopía",
                        "memorias",
                        "historia",
                        "autoayuda",
                        "contemporánea",
                      ].map((g) => (
                        <Button
                          key={g}
                          type="button"
                          variant={state.profile.avoidGenres.includes(g) ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => toggleArray(["profile", "avoidGenres"], g)}
                        >
                          {g}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label>Ritmo de lectura</Label>
                      <Select value={state.profile.readingSpeed} onValueChange={(v) => update(["profile", "readingSpeed"], v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Elige" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lento">Lento</SelectItem>
                          <SelectItem value="medio">Medio</SelectItem>
                          <SelectItem value="rápido">Rápido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Minutos típicos (entre semana)</Label>
                      <Input
                        type="number"
                        min={0}
                        max={120}
                        value={state.profile.maxMinutesWeekday}
                        onChange={(e) => update(["profile", "maxMinutesWeekday"], clamp(Number(e.target.value || 0), 0, 120))}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Minutos típicos (fin de semana)</Label>
                      <Input
                        type="number"
                        min={0}
                        max={240}
                        value={state.profile.maxMinutesWeekend}
                        onChange={(e) => update(["profile", "maxMinutesWeekend"], clamp(Number(e.target.value || 0), 0, 240))}
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Lectura antes de dormir</div>
                        <div className="text-xs text-muted-foreground">Ancla de hábito.</div>
                      </div>
                      <Switch checked={state.profile.bedtimeReading} onCheckedChange={(v) => update(["profile", "bedtimeReading"], v)} />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3 md:col-span-2">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Lectura con café</div>
                        <div className="text-xs text-muted-foreground">Otra ancla (si te va).</div>
                      </div>
                      <Switch checked={state.profile.coffeeReading} onCheckedChange={(v) => update(["profile", "coffeeReading"], v)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> Cómo mejorar el motor
                  </CardTitle>
                  <CardDescription>Ideas de producto si quieres llevarlo “a app real”.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <ul className="list-disc space-y-2 pl-5">
                    <li><span className="text-foreground">Añade tu lista real:</span> Goodreads/StoryGraph export, o un CSV.</li>
                    <li><span className="text-foreground">Aprendizaje:</span> puntúa cada recomendación (0–5) y ajusta pesos por género/mood.</li>
                    <li><span className="text-foreground">Anti-spoiler:</span> recomendaciones por “vibe” (tono/ritmo) y no por sinopsis.</li>
                    <li><span className="text-foreground">Modo sin tiempo:</span> solo textos de &lt; 30 min (relatos, artículos, poesía).</li>
                    <li><span className="text-foreground">Notificaciones:</span> recordatorio suave si llevas 2 días sin leer (sin culpabilizar).</li>
                  </ul>
                  <div className="rounded-xl border p-3 text-xs">
                    Nota: todo esto se puede conectar a APIs (Google Books, Open Library) para portadas y metadatos.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="biblioteca" className="mt-4">
            <div className="grid gap-4 md:grid-cols-12">
              <Card className="md:col-span-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" /> Guardados
                  </CardTitle>
                  <CardDescription>Tu “por leer”. El mítico cementerio digital.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedBooks.length === 0 ? (
                    <div className="rounded-xl border p-4 text-sm text-muted-foreground">Aún no has guardado nada.</div>
                  ) : (
                    savedBooks.map((b) => (
                      <div key={b.id} className="flex items-start justify-between gap-3 rounded-xl border p-3">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{b.title}</div>
                          <div className="text-sm text-muted-foreground">{b.author}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {b.genres.slice(0, 2).map((g) => (
                              <Badge key={g} variant="secondary">
                                {g}
                              </Badge>
                            ))}
                            <Badge variant="outline">{b.length}</Badge>
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2">
                          <Button size="sm" variant="outline" className="gap-2" onClick={() => finishBook(b.id)}>
                            <BadgeCheck className="h-4 w-4" /> Terminé
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-2" onClick={() => dismissBook(b.id)}>
                            <RefreshCw className="h-4 w-4" /> Quitar
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="md:col-span-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5" /> Terminados
                  </CardTitle>
                  <CardDescription>Pruebas de que sí haces cosas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {finishedBooks.length === 0 ? (
                    <div className="rounded-xl border p-4 text-sm text-muted-foreground">Cuando acabes uno, aparecerá aquí.</div>
                  ) : (
                    finishedBooks.map((b) => (
                      <div key={b.id} className="flex items-center justify-between rounded-xl border p-3">
                        <div>
                          <div className="text-sm font-medium">{b.title}</div>
                          <div className="text-sm text-muted-foreground">{b.author}</div>
                        </div>
                        <Badge variant="secondary" className="gap-1">
                          <BadgeCheck className="h-3.5 w-3.5" /> ok
                        </Badge>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-xs text-muted-foreground">
          <p>
            Esta demo guarda datos en <span className="font-medium text-foreground">localStorage</span>. No hay backend. No hay magia. Solo tu constancia (y un poco de UI bonita).
          </p>
        </div>
      </div>
    </div>
  );
}
