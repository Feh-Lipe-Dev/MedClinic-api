import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';

export enum UsuarioRole {
    ATENDENTE = "ATENDENTE",
    ADMIN = "ADMIN"
}

@Entity("usuarios")
export class Usuario {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("varchar")
    nome!: string

    @Column({ type: "varchar", unique: true })
    email!: string

    @Column("varchar")
    senha!: string

    @Column({
        type: "enum",
        enum: UsuarioRole,
        default: UsuarioRole.ATENDENTE
    })
    role!: UsuarioRole

    @CreateDateColumn()
    criadoEm!: Date
}