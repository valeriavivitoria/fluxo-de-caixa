document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let description = document.getElementById('description').value;
    let amount = parseFloat(document.getElementById('amount').value);
    let type = document.getElementById('type').value;
    let date = new Date().toLocaleDateString('pt-BR');
    
    if (!description || isNaN(amount)) return;
    
    let table = document.getElementById('transaction-table');
    let row = table.insertRow();
    row.insertCell(0).textContent = description;
    row.insertCell(1).textContent = `R$ ${amount.toFixed(2)}`;
    row.insertCell(2).textContent = type.charAt(0).toUpperCase() + type.slice(1);
    row.insertCell(3).textContent = date;
    
    updateSummary(type, amount);
    document.getElementById('transaction-form').reset();
});

// atualiza os valores
function updateSummary(type, amount) {
    let totalEntradas = parseFloat(document.getElementById('total-entradas').textContent);
    let totalSaidas = parseFloat(document.getElementById('total-saidas').textContent);
    
    if (type === 'entrada') {
        totalEntradas += amount;
    } else {
        totalSaidas += amount;
    }
    
    let saldo = totalEntradas - totalSaidas;
    
    document.getElementById('total-entradas').textContent = totalEntradas.toFixed(2);
    document.getElementById('total-saidas').textContent = totalSaidas.toFixed(2);
    document.getElementById('saldo').textContent = saldo.toFixed(2);
}

// botão "cancelar" limpa os campos
document.getElementById('cancel').addEventListener('click', function() {
    document.getElementById('transaction-form').reset();
});

// botão "limpar dados" zera o saldo
document.getElementById('clear-data').addEventListener('click', function() {
    document.getElementById('transaction-table').innerHTML = "";
    document.getElementById('total-entradas').textContent = "0.00";
    document.getElementById('total-saidas').textContent = "0.00";
    document.getElementById('saldo').textContent = "0.00";
});
