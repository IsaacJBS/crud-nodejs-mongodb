const Person = require('../models/Person');

const cadastrarPessoas = async (req, res) => {
    const { name, salary, approved } = req.body;
    const person = {
        name,
        salary,
        approved
    }

    if (!name) {
        return res.status(422).json({ mensagem: "O nome é obrigatório" })
    }

    if (!salary) {
        return res.status(422).json({ mensagem: "O salário é obrigatório" })
    }

    try {
        await Person.create(person);

        return res.status(201).json({ mensagem: "Pessoa inserida no sistema com sucesso" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const mostrarPessoas = async (req, res) => {
    try {
        const people = await Person.find();
        return res.status(200).json(people);
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
};

const mostrarUmaPessoa = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(422).json({ mensagem: "Usuário não encontrado" })
    }

    try {
        const person = await Person.findOne({ _id: id });

        if (!person) {
            return res.status(422).json({ mensagem: "Usuário não encontrado" });
        }

        return res.status(200).json(person);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const atualizarPessoa = async (req, res) => {
    const { id } = req.params;
    const { name, salary, approved } = req.body;
    const person = {
        name,
        salary,
        approved
    }
    try {
        const updatePerson = await Person.updateOne({ _id: id }, person);
        if (updatePerson.matchedCount === 0) {
            return res.status(422).json({ mensagem: "Usuário não encontrado" })
        }

        res.status(200).json(person);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deletarPessoa = async (req, res) => {
    const { id } = req.params;

    try {

        const person = await Person.deleteOne({ _id: id });

        if (!person) {
            return res.status(422).json({ mensagem: "Usuário não encontrado" });
        }

        res.status(200).json({ mensagem: "Pessoa excluída com sucesso" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    cadastrarPessoas,
    mostrarPessoas,
    mostrarUmaPessoa,
    atualizarPessoa,
    deletarPessoa
}