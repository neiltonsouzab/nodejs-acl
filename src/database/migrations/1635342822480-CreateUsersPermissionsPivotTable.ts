import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersPermissionsPivotTable1635342822480 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users_permissions',
      columns: [
        {
          name: 'user_id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'permission_id',
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
          referencedTableName: 'permissions',
          referencedColumnNames: ['id'],
          columnNames: ['permission_id'],
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_permissions');
  }

}
