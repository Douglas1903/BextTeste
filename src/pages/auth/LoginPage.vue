<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import '@/styles/login.css'
import loginImage from '@/assets/images/loginImage.jpg'
import BaseField from '@/components/base/BaseField.vue'
import AuthFooter from '@/components/login/AuthFooter.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const remember = ref(true)
const showPassword = ref(false)

const { signIn, loading, error } = useAuth()

const emailError = ref('')
const passwordError = ref('')
const formError = ref('')

function resetErrors() {
    emailError.value = ''
    passwordError.value = ''
    formError.value = ''
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const hasFieldErrors = computed(() => !!emailError.value || !!passwordError.value)

function validate() {
    resetErrors()

    const e = email.value.trim()
    const p = password.value

    if (!e) emailError.value = 'Informe seu email.'
    else if (!isValidEmail(e)) emailError.value = 'Informe um email válido.'

    if (!p) passwordError.value = 'Informe sua senha.'
    else if (p.length < 4) passwordError.value = 'A senha deve ter pelo menos 4 caracteres.'

    return !hasFieldErrors.value
}

async function handleLogin() {
    formError.value = ''

    if (!validate()) return

    try {
        await signIn(email.value.trim(), password.value)
        router.push({ name: 'Dashboard' })
    } catch (err: unknown) {
        if (!error.value) {
            formError.value = err instanceof Error ? err.message : 'Não foi possível entrar. Tente novamente.'
        }
    }
}

function handleForgotPassword() {
    formError.value = 'Recuperação de senha não implementada neste teste.'
    setTimeout(() => (formError.value = ''), 2500)
}
</script>

<template>
    <div class="login-wrapper">
        <div class="login-container">
            <div class="glow glow-1" aria-hidden="true"></div>
            <div class="glow glow-2" aria-hidden="true"></div>

            <div class="login-form">
                <div class="brand-row">
                    <div class="brand-text">
                        <p class="brand-kicker">Bem-vindo de volta</p>
                        <h1 class="title">Gerenciamento de Tarefas</h1>
                    </div>
                </div>

                <p class="subtitle">Faça login na sua conta para continuar</p>

                <form class="form" autocomplete="on" @submit.prevent="handleLogin">
                    <BaseField label="Email" v-model="email" name="email" type="email" autocomplete="username"
                        placeholder="seuemail@exemplo.com" :error="emailError" @input="emailError = ''" />

                    <BaseField label="Senha" v-model="password" name="password"
                        :type="showPassword ? 'text' : 'password'" autocomplete="current-password"
                        placeholder="••••••••" :error="passwordError" inputClass="input-password"
                        @input="passwordError = ''">
                        <template #right>
                            <button class="ghost-btn" type="button"
                                :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
                                @click="showPassword = !showPassword">
                                {{ showPassword ? 'Ocultar' : 'Mostrar' }}
                            </button>
                        </template>
                    </BaseField>

                    <div class="row">
                        <label class="check">
                            <input v-model="remember" type="checkbox" />
                            <span>Lembrar de mim</span>
                        </label>

                        <button class="link" type="button" @click="handleForgotPassword">
                            Esqueci minha senha
                        </button>
                    </div>

                    <p v-if="error" class="error error-global" :class="{ shake: !!error }">{{ error }}</p>
                    <p v-else-if="formError" class="error error-global shake">{{ formError }}</p>

                    <button class="btn-login" :disabled="loading">
                        <span v-if="loading" class="spinner" aria-hidden="true"></span>
                        <span>{{ loading ? 'Entrando...' : 'Entrar' }}</span>
                    </button>
                </form>

                <AuthFooter />

            </div>

            <div class="login-visual">
                <img :src="loginImage" alt="Visual decorativo" />
                <div class="visual-overlay">
                    <div class="visual-card">
                        <p class="visual-title">Organize. Priorize. Conclua.</p>
                        <p class="visual-subtitle">
                            Um painel simples para acompanhar tarefas e progresso do seu dia.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
