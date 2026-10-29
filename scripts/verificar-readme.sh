#!/usr/bin/env bash

# Executa os três comandos de teste documentados, sem criar commits.
set -u

BMW_PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$BMW_PROJECT_DIR" || exit 1

BMW_RUN_DIR="$BMW_PROJECT_DIR/.validacao/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BMW_RUN_DIR"
BMW_FAILURES=0
printf 'etapa\tcodigo_de_saida\n' > "$BMW_RUN_DIR/resumo.tsv"

# O Playwright transforma TS para executar, mas a checagem de tipos é separada.
npm run typecheck 2>&1 | tee "$BMW_RUN_DIR/typecheck.log"
BMW_TYPECHECK_STATUS="${PIPESTATUS[0]}"
if [ "$BMW_TYPECHECK_STATUS" -ne 0 ]; then
    printf 'A checagem de TypeScript falhou. Corrija os tipos antes dos testes.\n'
    exit "$BMW_TYPECHECK_STATUS"
fi

executar() {
    local bmw_etapa="$1"
    shift

    printf '\nExecutando %s: ' "$bmw_etapa"
    printf '%s ' "$@"
    printf '\n'

    BMW_REPORT_DIR="$BMW_RUN_DIR/$bmw_etapa/relatorio" \
    BMW_RESULTS_DIR="$BMW_RUN_DIR/$bmw_etapa/resultados" \
    "$@" 2>&1 | tee "$BMW_RUN_DIR/$bmw_etapa.log"
    local bmw_codigo="${PIPESTATUS[0]}"

    printf '%s\t%s\n' "$bmw_etapa" "$bmw_codigo" >> "$BMW_RUN_DIR/resumo.tsv"
    if [ "$bmw_codigo" -ne 0 ]; then
        BMW_FAILURES=$((BMW_FAILURES + 1))
    fi
}

executar 01-chromium npx playwright test --project=chromium --workers=1
executar 02-chromium-visivel npx playwright test --project=chromium --headed --workers=1
executar 03-todos-navegadores npx playwright test

printf '\nResumo das três execuções:\n'
cat "$BMW_RUN_DIR/resumo.tsv"
printf '\nLogs e relatórios: %s\n' "$BMW_RUN_DIR"

if [ "$BMW_FAILURES" -gt 0 ]; then
    exit 1
fi
