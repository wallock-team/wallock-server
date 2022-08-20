import { CreateCategoryDto } from "./dto/create-category.dto"

export async function initialCategories (userId: number) {
    let initialCate: CreateCategoryDto[] = [
        //Monthly expense
        { userId: userId, name: "Eating", isExpense: true, icon: "Eating", group: "Monthly Expense" },
        { userId: userId, name: "Transfer", isExpense: true, icon: "Transfer", group: "Monthly Expense" },
        { userId: userId, name: "Rent House", isExpense: true, icon: "Rent House", group: "Monthly Expense" },
        { userId: userId, name: "Water bill", isExpense: true, icon: "Water bill", group: "Monthly Expense" },
        { userId: userId, name: "Telephone bill", isExpense: true, icon: "Telephone bill", group: "Monthly Expense" },
        { userId: userId, name: "Electric bill", isExpense: true, icon: "Electric bill", group: "Monthly Expense" },
        { userId: userId, name: "Gas bill", isExpense: true, icon: "Gas bill", group: "Monthly Expense" },
        { userId: userId, name: "TV bill", isExpense: true, icon: "TV bill", group: "Monthly Expense" },
        { userId: userId, name: "Internet bill", isExpense: true, icon: "Internet bill", group: "Monthly Expense" },
        { userId: userId, name: "Other bill", isExpense: true, icon: "Other bill", group: "Monthly Expense" },
        //Necessary spending
        { userId: userId, name: "Fix & Decoration Home", isExpense: true, icon: "Fix & Decoration Home", group: "Necessary spending" },
        { userId: userId, name: "Vehicle maintenance", isExpense: true, icon: "vehicle maintenance", group: "Necessary spending" },
        { userId: userId, name: "Physical examination", isExpense: true, icon: "Physical examination", group: "Necessary spending" },
        { userId: userId, name: "Insurance", isExpense: true, icon: "Insurance", group: "Necessary spending" },
        { userId: userId, name: "Education", isExpense: true, icon: "Education", group: "Necessary spending" },
        { userId: userId, name: "Houseware", isExpense: true, icon: "Houseware", group: "Necessary spending" },
        { userId: userId, name: "Personal stuff", isExpense: true, icon: "Personal stuff", group: "Necessary spending" },
        { userId: userId, name: "Pet", isExpense: true, icon: "Pet", group: "Necessary spending" },
        { userId: userId, name: "Home service", isExpense: true, icon: "Home service", group: "Necessary spending" },
        { userId: userId, name: "Other costs", isExpense: true, icon: "Other costs", group: "Necessary spending" },
        //Sport&Makeup
        { userId: userId, name: "Sport", isExpense: true, icon: "Sport", group: "Sport & Makeup" },
        { userId: userId, name: "Make Up", isExpense: true, icon: "Make Up", group: "Sport & Makeup" },
        //Invest
        { userId: userId, name: "Bank interest", isExpense: false, icon: "Bank interest", group: "Invest" },
        //Income
        { userId: userId, name: "Salary", isExpense: false, icon: "Salary", group: "Income" },
        { userId: userId, name: "Other income", isExpense: false, icon: "Other income", group: "Income" },
    ]
    return initialCate
}

