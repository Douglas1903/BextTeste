<script setup lang="ts">
import type { Task } from '@/types/task'
import '@/styles/edit-card.css'
import { reactive, watch, computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  task: Task | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', task: Task): void
}>()

const form = reactive<Task>({
  id: 0,
  title: '',
  description: '',
  priority: 'Média',
  date: '',
  category: '',
  status: 'todo'
})

const touched = reactive({
  title: false,
  category: false
})

const titleError = computed(() => {
  const v = (form.title ?? '').trim()
  return v ? '' : 'Informe um título.'
})

const categoryError = computed(() => {
  const v = (form.category ?? '').trim()
  return v ? '' : 'Informe uma categoria.'
})

const isValid = computed(() => !titleError.value && !categoryError.value)


watch(
  () => props.task,
  (task) => {
    if (!task) return

    Object.assign(form, {
      ...task,
      date: task.date ? task.date.slice(0, 10) : ''
    })
  },
  { immediate: true }
)


function close() {
  emit('update:modelValue', false)
}

function save() {
  touched.title = true
  touched.category = true

  if (!isValid.value) return

  emit('save', {
    ...form,
    title: form.title.trim(),
    category: form.category.trim(),
    date: form.date ? new Date(form.date + 'T00:00:00').toISOString() : new Date().toISOString()
  })

  close()
}

</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="edit-overlay" @click.self="close">
      <div class="edit-modal">

        <header class="edit-header">
          <h2 class="title-modal">Editar Tarefa</h2>
          <button class="close-btn" @click="close">✕</button>
        </header>


        <div class="edit-body">
          <div class="field">
            <label>Título</label>
            <input v-model="form.title" :class="{ 'is-invalid': touched.title && !!titleError }"
              @blur="touched.title = true" />
            <small v-if="touched.title && titleError" class="field-error">{{ titleError }}</small>
          </div>


          <div class="field">
            <label>Descrição</label>
            <textarea v-model="form.description" rows="4" />
          </div>

          <div class="grid">
            <div class="field">
              <label>Categoria</label>
              <input v-model="form.category" :class="{ 'is-invalid': touched.category && !!categoryError }"
                @blur="touched.category = true" />
              <small v-if="touched.category && categoryError" class="field-error">{{ categoryError }}</small>
            </div>


            <div class="field">
              <label>Data DE CONCLUSÃO</label>
              <input class="readonly" readonly type="date" v-model="form.date" />

            </div>

            <div class="field">
              <label>Prioridade</label>
              <select v-model="form.priority">
                <option>Alta</option>
                <option>Média</option>
                <option>Baixa</option>
              </select>
            </div>

            <div class="field">
              <label>Status</label>
              <select v-model="form.status">
                <option value="todo">A Fazer</option>
                <option value="doing">Em Progresso</option>
                <option value="done">Concluído</option>
              </select>
            </div>
          </div>
        </div>

        <footer class="edit-footer">
          <button class="secondary-btn" @click="close">Cancelar</button>
          <button class="primary-btn" :disabled="!isValid" @click="save">
            Salvar Alterações
          </button>

        </footer>
      </div>
    </div>
  </Teleport>
</template>
