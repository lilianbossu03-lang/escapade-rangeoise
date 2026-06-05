# CLAUDE.md — L'Escapade Rangeoise

Instructions pour Claude Code sur ce projet.

---

## Supabase — workflow des migrations

Le projet est lié au projet Supabase distant (`jlbcpsfbqtyftsurzgek` — escapade-rangeoise, Paris) via la Supabase CLI (`~/.npm-global/bin/supabase`). À chaque modification du schéma (table, colonne, policy RLS, trigger, fonction SQL, etc.) :

1. **Toujours créer une nouvelle migration** via la commande officielle :
   ```bash
   ~/.npm-global/bin/supabase migration new nom_descriptif
   ```
   Ne JAMAIS modifier un fichier de migration existant déjà appliqué.

2. **Écrire le SQL** dans le fichier généré (`supabase/migrations/YYYYMMDDHHMMSS_*.sql`).

3. **Pousser vers la base distante** automatiquement à la fin de toute modification :
   ```bash
   ~/.npm-global/bin/supabase db push
   ```

4. **Confirmer** dans la réponse à Lilian : "Migration appliquée sur Supabase distant : [nom du fichier]".

> L'access token et le linking sont déjà configurés dans `~/.supabase/`.
> Lilian n'a JAMAIS à aller dans le SQL Editor du dashboard Supabase pour appliquer une migration : tout passe par la CLI.

### Vérifier l'état des migrations

```bash
~/.npm-global/bin/supabase migration list --linked
```

Les colonnes Local et Remote doivent toujours être identiques.

### Cas spécial : scripts d'audit (SELECT only)

Les scripts SQL qui ne modifient pas le schéma (type `check_*.sql`) ne sont **pas** des migrations. Place-les dans `supabase/scripts/` et propose à Lilian de les exécuter dans le SQL Editor du dashboard (résultat plus lisible en tableau).

### Historique des migrations

| Fichier | Contenu | Statut |
|---------|---------|--------|
| `001_init.sql` | Schéma initial (tables, RLS, storage bucket) | ✅ appliqué |
| `002_periodes_tarifaires.sql` | Table periodes_tarifaires | ✅ appliqué |

---

## Stack technique

- **Framework** : Next.js 15 App Router (Server Components, Server Actions)
- **Base de données** : Supabase (PostgreSQL + Auth + Storage)
- **Styles** : Tailwind CSS (mobile-first)
- **Animations** : Framer Motion
- **Emails** : Resend
- **Validation** : Zod
- **Déploiement** : Vercel

## Conventions

- Inputs/textareas : `text-base` minimum (anti-zoom iOS — jamais `text-sm` sur un champ de formulaire)
- Éléments interactifs : `min-h-[44px]` (touch targets iOS)
- Hauteurs plein écran : `min-h-[100dvh]` (jamais `h-screen` ni `min-h-screen`)
- Bouton flottant : `style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}`
