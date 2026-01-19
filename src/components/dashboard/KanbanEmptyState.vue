<script setup lang="ts">
const props = defineProps<{
    title: string
    text?: string
    actionLabel?: string
}>()

const emit = defineEmits<{
    (e: 'action'): void
}>()
</script>

<template>
    <div class="kanban-empty">
        <h2 class="kanban-empty-title">{{ props.title }}</h2>

        <p v-if="props.text" class="kanban-empty-text">
            {{ props.text }}
        </p>

        <button class="kanban-empty-action primary-btn" type="button" @click="emit('action')">
            {{ props.actionLabel ?? '+ Criar primeiro card' }}
        </button>
    </div>
</template>
