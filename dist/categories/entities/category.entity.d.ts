import { BaseEntity } from 'src/base.entity';
export declare class Category extends BaseEntity {
    uID: number;
    parentID: number | null;
    isExpense: number;
    tier: number;
    icon: string;
}
