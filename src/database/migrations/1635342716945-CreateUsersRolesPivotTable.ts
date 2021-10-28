import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersRolesPivotTable1635342716945 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users_roles',
      columns: [
        {
          name: 'user_id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'role_id',
          type: 'uuid',
          isPrimary: true,
        },
      ],
      foreignKeys: [
        {
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
        },
        {
          referencedTableName: 'roles',
          referencedColumnNames: ['id'],
          columnNames: ['role_id'],
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
